import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const pkgPath = join(root, "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
const clientPath = join(root, "lib/client.js");
const hostPath = join(root, "lib/index.js");
const patchPath = join(root, pkg.dsh?.bundle?.patch ?? "");
const client = readFileSync(clientPath, "utf8");
const host = readFileSync(hostPath, "utf8");
const patch = existsSync(patchPath) ? readFileSync(patchPath, "utf8") : "";

check(pkg.name === "dsh-chat-pdf-export", "package name changed unexpectedly");
check(pkg.type === "module", "package must use ESM");
check(pkg.dsh?.bundle?.patch === "cordis.patch.yml", "package.json must declare dsh.bundle.patch");
check(pkg.dsh?.client?.platform === "web", "package.json must declare a web client");
check(pkg.dsh?.client?.inject?.includes("@deepseek-ai/dsh-client-ui-conversation"), "client must wait for the conversation UI slot provider");
check(/^- insert:/m.test(patch), "patch must contain an insert list");
check(patch.includes("id: dsh-chat-pdf-export"), "patch must load the plugin id");
check(patch.includes("name: dsh-chat-pdf-export"), "patch must load the plugin name");
check(/exports\.apply\s*=|return \{ apply, inject \}/.test(client), "client must expose apply");
check(/const inject = \["slots", "locale"\]/.test(client), "client must expose its slot/locale injection list");
check(client.includes("conversation.session.header.utilities"), "client must use the confirmed session header utilities slot");
check(client.includes('require("react-dom")'), "client must use the host React DOM module for the modal portal");
check(client.includes("ReactDOM.createPortal"), "client must render the modal outside the header slot wrapper");
check(client.includes("data-chat-flow-key"), "client must select stable rendered flow keys");
check(client.includes('new Set(["assistant-step"])'), "client must restrict export rows to assistant body only");
check(client.includes('data-variant="think"'), "client must remove inline thinking blocks");
check(client.includes("data-turn-usage-details"), "client must guard against token-usage markup");
check(client.includes("data-time-hover-root"), "client must remove message action chrome");
check(client.includes("button.closest(\"code\")"), "client must preserve text-only file mentions inside code");
check(client.includes("cloneNode(true)"), "client must clone rendered DOM instead of rebuilding message text");
check(client.includes("window.print()"), "client must invoke the native print dialog");
check(client.includes("@media print"), "client must include print-only CSS");
check(client.includes("afterprint"), "client must clean up after printing or cancellation");
check(client.includes("dshcpf-print-flow{display:block"), "print flow must use a fragmentable block layout");
check(client.includes("break-inside:auto;page-break-inside:auto"), "print rows must be allowed to fragment across pages");
check(client.includes("display:block!important;position:static!important"), "print body must not inherit the app flex layout");
check(client.includes("@page{size:auto;margin:10mm 12mm}"), "print page margins must stay compact");
check(client.includes("contentVisibility"), "client must exclude content-visibility-hidden rows");
check(client.includes("getBoundingClientRect"), "client must ignore empty placeholder rows without excluding off-screen loaded rows");
check(!client.includes("fetch("), "client must not make network requests");
check(!client.includes("XMLHttpRequest"), "client must not use XMLHttpRequest");
check(!client.includes("document.body.innerHTML"), "client must not replace the live document with HTML");
check(!host.includes("SKILL.md"), "host must not depend on a removed skill file");

for (const file of [hostPath, clientPath]) {
  try {
    execFileSync(process.execPath, ["--check", file], { stdio: "pipe" });
  } catch {
    failures.push(`${file} failed node --check`);
  }
}

const { apply } = await import(hostPath);
apply();

if (failures.length > 0) {
  console.error(failures.map((message) => `✗ ${message}`).join("\n"));
  process.exit(1);
}

console.log("✓ smoke test passed — local PDF plugin contract is valid");

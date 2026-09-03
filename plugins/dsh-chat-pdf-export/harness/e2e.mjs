import puppeteer from "file:///Users/hudsonwang/Library/Application%20Support/dsh-desktop/harness/profiles/.generations/live/dsh-univer-office+0.2.12+33bd1cb5c89d/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js";

const url = process.env.CHAT_PDF_PREVIEW_URL || "http://127.0.0.1:41783/harness/harness.html";
const browser = await puppeteer.launch({
  headless: "new",
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  args: ["--no-sandbox", "--disable-gpu", "--disable-background-networking"],
  defaultViewport: { width: 920, height: 820, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
try {
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.waitForSelector(".dshcpf-trigger", { timeout: 10000 });
  await page.click(".dshcpf-trigger");
  await page.waitForSelector(".dshcpf-group", { timeout: 10000 });
  const dialog = await page.$eval(".dshcpf-dialog", (element) => {
    const box = element.getBoundingClientRect();
    return { x: box.x, y: box.y, width: box.width, height: box.height, viewportWidth: window.innerWidth, viewportHeight: window.innerHeight };
  });
  if (dialog.x < 0 || dialog.y < 0 || dialog.width > Math.min(760, dialog.viewportWidth - 24) || dialog.height > dialog.viewportHeight - 24) throw new Error(`dialog is clipped or too wide: ${JSON.stringify(dialog)}`);
  const initial = await page.$$eval(".dshcpf-check", (inputs) => inputs.map((input) => input.checked));
  if (initial.length !== 2 || !initial.every(Boolean)) throw new Error("selection dialog did not list/select both turns");
  await page.click(".dshcpf-check");
  await page.click(".dshcpf-print");
  await new Promise((resolve) => setTimeout(resolve, 120));
  const result = await page.evaluate(() => ({ snapshot: window.__printSnapshot, rootPresent: Boolean(document.querySelector(".dshcpf-print-root")), liveRows: document.querySelectorAll("[data-chat-flow-key]").length }));
  const keys = result.snapshot?.keys || [];
  if (keys.join(",") !== "turn-2-assistant") throw new Error(`wrong printed keys: ${keys.join(",")}`);
  for (const marker of ["katex", "<math", "<table", "<pre", "plugin-submit-work/dsh-chat-pdf-export/lib/client.js"]) {
    if (!result.snapshot.html.includes(marker)) throw new Error(`missing cloned marker: ${marker}`);
  }
  for (const marker of ["turn-2-user", "turn-2-process", "turn-2-tail", "思考", "tokens", "data-variant=\"think\"", "data-turn-process-inline", "data-turn-usage-details", "data-time-hover-root", "11:02", "<button"]) {
    if (result.snapshot.html.includes(marker)) throw new Error(`metadata leaked into print root: ${marker}`);
  }
  if (result.rootPresent || result.liveRows !== 8) throw new Error("print cleanup or live DOM preservation failed");
  console.log("✓ Chrome E2E passed — selected rendered rows retained rich markup and cleaned up");
} finally {
  await browser.close();
}

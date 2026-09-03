import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, writeFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const resultFile = "/tmp/dsh-chat-pdf-export-harness-result.txt";
const port = Number(process.env.PORT || 41783);
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || "127.0.0.1"}`);
  if (url.pathname === "/harness/result") {
    writeFileSync(resultFile, url.searchParams.get("t") || "", "utf8");
    response.writeHead(204);
    response.end();
    return;
  }
  const requested = url.pathname === "/" ? "/harness/harness.html" : url.pathname;
  const file = normalize(join(root, requested.replace(/^\/+/, "")));
  if (!file.startsWith(root) || !existsSync(file)) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }
  try {
    const body = await readFile(file);
    response.writeHead(200, {
      "content-type": contentTypes[extname(file)] || "application/octet-stream",
      "cache-control": "no-store",
    });
    response.end(body);
  } catch (error) {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end(String(error));
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`CHAT_PDF_HARNESS_URL=http://127.0.0.1:${port}/harness/harness.html`);
});

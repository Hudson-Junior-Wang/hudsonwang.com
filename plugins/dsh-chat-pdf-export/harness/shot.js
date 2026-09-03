// Electron harness for the local chat PDF exporter preview.
// Usage:
//   "/Applications/DSH Desktop.app/Contents/MacOS/DSH Desktop" shot.js <url> --mode=test
//   "/Applications/DSH Desktop.app/Contents/MacOS/DSH Desktop" shot.js <url>?open=1 --mode=menu --out=/tmp/chat-pdf.png
const { app, BrowserWindow } = require("electron");
const fs = require("fs");

app.setPath("userData", "/tmp/dsh-chat-pdf-export-electron");
app.disableHardwareAcceleration();

const url = process.argv.find((argument) => argument.startsWith("http"));
const mode = (process.argv.find((argument) => argument.startsWith("--mode=")) || "--mode=shot").slice(7);
const out = (process.argv.find((argument) => argument.startsWith("--out=")) || "").slice(6);
const resultFile = "/tmp/dsh-chat-pdf-export-harness-result.txt";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function waitForResult(ms) {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    if (fs.existsSync(resultFile)) return fs.readFileSync(resultFile, "utf8").trim();
    await sleep(120);
  }
  return null;
}

app.whenReady().then(async () => {
  const height = mode === "menu" ? 820 : mode === "test" ? 680 : 760;
  const win = new BrowserWindow({ width: 920, height, show: true, backgroundColor: "#0b111a" });
  win.webContents.setBackgroundThrottling(false);
  try {
    await win.loadURL(url);
    if (mode === "test") {
      const result = await waitForResult(20000);
      console.log("RESULT=" + (result ?? "TIMEOUT: no result postback"));
      if (result?.startsWith("CHATPDF-PASS")) process.exitCode = 0;
      else process.exitCode = 1;
    } else {
      await sleep(650);
      const image = await win.webContents.capturePage();
      fs.writeFileSync(out, image.toPNG());
      console.log("SHOT=" + out);
    }
  } catch (error) {
    console.error("ERR=" + error);
    process.exitCode = 1;
  } finally {
    app.quit();
  }
});

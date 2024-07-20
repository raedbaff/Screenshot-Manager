const { app, BrowserWindow, ipcMain } = require("electron");
require("dotenv").config();
const path = require("path");
const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");
const screenshot = require("screenshot-desktop");

let captureIntervalId;
var captureInterval = 10000;

async function captureScreenshot() {
  const imgPath = path.join(
    app.getPath("temp"),
    `screenshot-${Date.now()}.png`
  );
  try {
    await screenshot({ filename: imgPath });
    return imgPath;
  } catch (err) {
    console.error("Error capturing screenshot:", err);
    return null;
  }
}

async function uploadScreenshot(filePath) {
  if (!filePath) return;
  const fileBuffer = fs.readFileSync(filePath);
  const form = new FormData();
  form.append("userId", "1");
  form.append("screenshot", fileBuffer, {
    filename: path.basename(filePath),
    contentType: "image/png",
  });

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/screenshots`,
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
      }
    );

    if (response.status === 201) {
      console.log("Screenshot uploaded successfully");
    } else {
      console.error("Failed to upload screenshot:", response.statusText);
    }
  } catch (error) {
    console.error("Error uploading screenshot:", error.message);
  }
}

function startCapture() {
  if (captureIntervalId) return;
  captureIntervalId = setInterval(async () => {
    const filePath = await captureScreenshot();
    await uploadScreenshot(filePath);
  }, captureInterval);
}

function stopCapture() {
  if (captureIntervalId) {
    clearInterval(captureIntervalId);
    captureIntervalId = null;
  }
}

ipcMain.on("start-capture", () => {
  startCapture();
});
ipcMain.on("change-interval", (event, value) => {
  captureInterval = value;
});

ipcMain.on("stop-capture", () => {
  stopCapture();
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

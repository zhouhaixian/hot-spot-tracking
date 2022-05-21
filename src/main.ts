import { app } from "electron";
import { createTray } from "./createTray";
import { autoUpdate } from "./autoUpdate";

if (app.requestSingleInstanceLock()) {
  if (process.env.NODE_ENV !== "DEV") autoUpdate();

  app.disableHardwareAcceleration();
  app.whenReady().then(createTray).catch(app.quit);
} else {
  app.quit();
}

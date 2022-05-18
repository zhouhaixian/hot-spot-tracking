import { app } from "electron";
import { createTray } from "./createTray";

if (app.requestSingleInstanceLock()) {
  app.disableHardwareAcceleration();
  app.whenReady().then(createTray);
} else {
  app.quit();
}

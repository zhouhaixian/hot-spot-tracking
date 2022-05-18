import { app } from "electron";
import { createTray } from "./createTray";

if (!app.requestSingleInstanceLock()) {
  app.quit()
}

app.disableHardwareAcceleration();
app.whenReady().then(createTray);

import { app } from "electron";
import { createTray } from "./createTray";

app.disableHardwareAcceleration()
app.whenReady().then(createTray);

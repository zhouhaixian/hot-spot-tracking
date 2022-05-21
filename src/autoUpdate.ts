import { autoUpdater } from "electron-updater";
import { scheduleJob } from "node-schedule";

export function autoUpdate() {
  autoUpdater.checkForUpdates();

  const rule = "* 5 * * * *";
  scheduleJob(rule, autoUpdater.checkForUpdates);

  autoUpdater.on("update-downloaded", () => {
    autoUpdater.quitAndInstall();
  });
}

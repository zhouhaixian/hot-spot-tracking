import { app } from "electron";
import { autoUpdater } from "electron-updater";
import { scheduleJob } from "node-schedule";

export function autoUpdate() {
  const server = "https://hot-spot-tracking-update.vercel.app";
  const url = `${server}/update/${process.platform}/${app.getVersion()}`
  autoUpdater.setFeedURL(url)
  autoUpdater.checkForUpdates();

  const rule = "* 30 * * * *";
  scheduleJob(rule, () => autoUpdater.checkForUpdates());

  autoUpdater.on("update-downloaded", () => {
    autoUpdater.quitAndInstall();
  });
}

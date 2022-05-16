import { app, nativeImage, Tray } from "electron";
import { createMenuBuilder } from "./createMenuBuilder";
import {
  getBaiduHotList,
  getBilibiliHotList,
  getWeiboHotList,
} from "./provider";
import path from "path";
import schedule from "node-schedule";

export function createTray() {
  const icon = nativeImage.createFromPath(
    path.resolve(process.cwd(), "resources/assets/hot.ico")
  );
  const tray = new Tray(icon);
  tray.setTitle("热点跟踪");
  tray.setToolTip("热点跟踪");

  tray.on("click", () => tray.popUpContextMenu());
  tray.on("double-click", () => tray.popUpContextMenu());

  refreshContent();

  const rule = "* 1 * * * *";
  schedule.scheduleJob(rule, refreshContent);

  async function refreshContent() {
    const menuBuilder = createMenuBuilder();

    menuBuilder.addHotList(await getBaiduHotList());
    menuBuilder.addHotList(await getWeiboHotList());
    menuBuilder.addHotList(await getBilibiliHotList());

    menuBuilder.addMenuItem("刷新", refreshContent);
    menuBuilder.addMenuItem("退出", app.quit);

    tray.setContextMenu(menuBuilder.build());
  }
}

import { app, nativeImage, shell, Tray } from "electron";
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

    menuBuilder.addMenuItem({
      label: "刷新",
      click: refreshContent,
    });

    menuBuilder.addMenuItem({
      label: "自启动",
      type: "checkbox",
      checked: app.getLoginItemSettings().openAtLogin,
      click: () =>
        app.setLoginItemSettings({
          openAtLogin: !app.getLoginItemSettings().openAtLogin,
        }),
    });

    menuBuilder.addMenuItem({
      label: "Github",
      click: () => shell.openExternal("https://github.com/zhouhaixian/hot-spot-tracking")
    })

    menuBuilder.addMenuItem({
      label: "退出",
      click: app.quit,
    });

    tray.setContextMenu(menuBuilder.build());
  }
}

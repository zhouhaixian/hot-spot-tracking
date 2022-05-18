import { Menu, MenuItemConstructorOptions, shell } from "electron";
import {
  HotList,
  MenuBuilder,
  MenuGroupBuilder,
} from "./types";

export function createMenuBuilder(): MenuBuilder {
  const menu: MenuItemConstructorOptions[] = [];

  function addGroup(title: string): MenuGroupBuilder {
    let length = menu.push({
      label: title,
      submenu: [],
    });
    const item: {
      label: string;
      submenu: MenuItemConstructorOptions[];
    } = menu[--length] as {
      label: string;
      submenu: MenuItemConstructorOptions[];
    };
    function appendItem(options: MenuItemConstructorOptions) {
      item.submenu.push(options);
      return options;
    }
    function appendLink(title: string, url: string) {
      let length = item.submenu.push({
        label: title,
        click: () => {
          shell.openExternal(url);
        },
      });
      return item.submenu[--length];
    }
    return { appendLink, appendItem };
  }

  function addMenuItem(options: MenuItemConstructorOptions) {
    menu.push(options);
    return menu;
  }

  function addHotList(hotList: HotList) {
    const submenu = addGroup(hotList.name);
    for (const item of hotList.data) {
      submenu.appendLink(item.title, item.url);
    }
    return menu;
  }

  function build() {
    return Menu.buildFromTemplate(menu);
  }

  return { build, addGroup, addMenuItem, addHotList };
}

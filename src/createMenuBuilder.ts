import { Menu, MenuItemConstructorOptions, shell } from "electron";
import {
  HotList,
  MenuTemplateBuilder,
  MenuGroupTemplateBuilder,
} from "./types";

export function createMenuBuilder(): MenuTemplateBuilder {
  const menuTemplate: MenuItemConstructorOptions[] = [];

  function addGroup(title: string): MenuGroupTemplateBuilder {
    let length = menuTemplate.push({
      label: title,
      submenu: [],
    });
    const item: {
      label: string;
      submenu: MenuItemConstructorOptions[];
    } = menuTemplate[--length] as {
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
    menuTemplate.push(options);
    return menuTemplate;
  }

  function addHotList(hotList: HotList) {
    const submenu = addGroup(hotList.name);
    for (const item of hotList.data) {
      submenu.appendLink(item.title, item.url);
    }
    return menuTemplate;
  }

  function build() {
    return Menu.buildFromTemplate(menuTemplate);
  }

  return { build, addGroup, addMenuItem, addHotList };
}

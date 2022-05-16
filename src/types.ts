export interface BaiduHotList {
  success: boolean;
  data: {
    cards: BaiduHotListDataCardsItem[];
    curBoardName: string;
    logid: string;
    platform: string;
    tabBoard: {
      index: number;
      text: string;
      typeName: string;
    }[];
    tag: [];
  };
  error: {
    code: number;
    message: string;
  };
}

export interface BaiduHotListDataCardsItemContent {
  appUrl: string;
  desc: string;
  hotChange: string;
  hotScore: string;
  hotTag: string;
  img: string;
  index: number;
  query: string;
  rawUrl: string;
  show: [];
  url: string;
  word: string;
}

export interface BaiduHotListDataCardsItem {
  component: string;
  content: BaiduHotListDataCardsItemContent[];
  more: number;
  moreAppUrl: string;
  moreUrl: string;
  text: string;
  topContent: [BaiduHotListDataCardsItemContent];
  typeName: string;
  updateTime: string;
}

export interface HotListItem {
  title: string;
  url: string;
}

export interface HotList {
  name: string;
  data: HotListItem[];
}

export interface MenuGroupTemplateBuilder {
  appendLink: (title: string, url: string) => Electron.MenuItemConstructorOptions;
}

export interface MenuTemplateBuilder {
  addGroup: (title: string) => MenuGroupTemplateBuilder;
  build: () => Electron.Menu;
  addMenuItem: (title: string, click: () => any) => Electron.MenuItemConstructorOptions[];
  addHotList: (hotList: HotList) => Electron.MenuItemConstructorOptions[];
}

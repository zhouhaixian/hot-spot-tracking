import axios from "axios";
import { BaiduHotList, HotList } from "../types";

export async function getBaiduHotList(): Promise<HotList> {
  const response = await axios.get(
    "https://top.baidu.com/api/board?platform=wise&tab=realtime",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Mobile Safari/537.36",
        Host: "top.baidu.com",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Encoding": "gzip, deflate, br",
        Referer: "https://top.baidu.com/board?tab=novel",
      },
    }
  );
  const baiduHotList: BaiduHotList = response.data;

  const list = [];
  const topContentOfBaidu = baiduHotList.data.cards[0].topContent[0];
  list.push({
    title: `1.  ${topContentOfBaidu.word}`,
    url: `https://www.baidu.com/s?word=${topContentOfBaidu.word}`,
  });
  const contentOfBaidu = baiduHotList.data.cards[0].content;
  for (const item of contentOfBaidu) {
    list.push({
      title: `${item.index + 2}.  ${item.word}`,
      url: `https://www.baidu.com/s?word=${item.word}`,
    });
  }

  return {
    name: "百度",
    data: list,
  };
}

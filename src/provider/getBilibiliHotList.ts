import axios from "axios";
import { load } from "cheerio";
import { HotList, HotListItem } from "../types";

export async function getBilibiliHotList(): Promise<HotList> {
  const response = await axios.get(
    "https://www.bilibili.com/v/popular/rank/all",
    {
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36",
        "Accept-Language": "zh-CN,zh;q=0.9",
      },
    }
  );
  const html = response.data;
  const $ = load(html);

  const list: HotListItem[] = [];
  $("a.title").each((index, element) => {
    const title = $(element).text();
    const url = $(element).attr("href")!;
    list.push({
      title: `${index + 1}.  ${title}`,
      url: `https:${url}`,
    });
  });

  return {
    name: "哔哩哔哩",
    data: list,
  };
}

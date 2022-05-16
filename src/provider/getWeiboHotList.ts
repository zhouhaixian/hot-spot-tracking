import axios from "axios";
import { load } from "cheerio";
import { HotList, HotListItem } from "../types";

export async function getWeiboHotList(): Promise<HotList> {
  const response = await axios.get(
    "https://s.weibo.com/top/summary?cate=socialevent",
    {
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cookie": "SUB=_2AkMV3H0if8NxqwJRmPAWz2nqZYR2yArEieKjgIz5JRMxHRl-yT8XqnUvtRB6PlxTzRC8X2TyMCF7Q7Z35W3RuRHtA_SZ; SUBP=0033WrSXqPxfM72-Ws9jqgMF55529P9D9WF7U-x.8qqTTTbE-aYUsGiD"
      }
    }
  );
  const html = response.data;
  const $ = load(html);

  const list: HotListItem[] = [];
  $("#pl_top_realtimehot table tbody .td-02 a").each((index, element) => {
    const title = $(element).text();
    list.push({
      title: `${index + 1}.  ${title}`,
      url: `https://s.weibo.com/weibo?q=${encodeURIComponent(title)}`,
    });
  });

  return {
    name: "微博",
    data: list,
  };
}

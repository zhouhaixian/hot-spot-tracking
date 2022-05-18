import axios from "axios";
import { FSearchHotList, HotList, HotListItem } from "../types";

export async function getFSearchHotList(): Promise<HotList> {
  const response = await axios.get(
    "https://fsoufsou.com/search-engine-listing/v1/trending/topics",
    {
      headers: {
        Accept: "*/*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36",
        "Accept-Language": "zh-CN,zh;q=0.9",
        Referer: "https://fsoufsou.com/",
      },
    }
  );
  const FSearchHotList: FSearchHotList = response.data;

  const list: HotListItem[] = [];
  for (const [index, item] of FSearchHotList.topics.entries()) {
    list.push({
      title: `${index + 1}.  ${item.title}`,
      url: item.link,
    });
  }

  return {
    name: "FSearch",
    data: list,
  };
}

import request from "request-promise";
import { Message } from "discord.js";
import { get_args } from "../utils/GetArgs";
import { Optional } from "../../types/Index";

export default async (_: any, message: Message): Promise<void> => {
  const search_terms: Optional<Array<string>, null> = get_args(message);

  if (!search_terms) {
    message.reply("You need to provide something for me to search for.");
    return;
  }

  const response: any = await request({
    headers: { "User-Agent": "Mozilla/5.0" },
    uri: "https://www.googleapis.com/customsearch/v1",
    json: true,
    qs: {
      cx: process.env.GOOGLE_SEARCH_ENGINE_ID as string,
      key: process.env.GOOGLE_SEARCH_API_KEY as string,
      num: 1,
      q: search_terms.join(" ")
    }
  }).catch((error: any) => {
    console.error(error);
    message.reply(
      `Something went wrong trying to search for \`${search_terms.join(" ")}\`.`
    );
  });

  if (response.searchInformation.totalResults === "0")
    message.reply(
      `Nothing was found when searching for \`${search_terms.join(" ")}\``
    );

  const [result]: any = response.items;

  if (result) {
    message.reply(result.link);
  } else {
    message.reply(
      `Something went wrong trying to search for \`${search_terms.join(" ")}\``
    );
  }
};

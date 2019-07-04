import request from "request-promise";
import { Message, RichEmbed } from "discord.js";
import { Optional } from "../types";
import { get_args } from "../utils";

export default async (client: any, message: Message): Promise<void> => {
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
  }).catch(error => {
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

  const embed = new RichEmbed()
    .setColor("#0066CC")
    .setURL(result.link)
    .setTitle(result.title)
    .setDescription(result.snippet)
    .setFooter(result.link, result.link);

  if (result.pagemap && result.pagemap.cse_thumbnail)
    embed.setThumbnail(result.pagemap.cse_thumbnail[0].src);

  message.channel.send({ embed });
};

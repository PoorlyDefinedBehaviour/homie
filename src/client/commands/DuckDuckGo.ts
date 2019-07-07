import request from "request-promise";
import { Message } from "discord.js";
import { Optional } from "../types";
import { get_args } from "../utils";

export default async (client: any, message: Message): Promise<void> => {
  const search_terms: Optional<Array<string>, null> = get_args(message);

  if (!search_terms) {
    message.reply("You need to provide something for me to search for.");
    return;
  }

  const response: any = await request({
    method: "GET",
    url: "http://api.duckduckgo.com/",
    json: true,
    qs: {
      q: `${search_terms.join(" ")}`,
      format: "json",
      pretty: "1",
      no_redirect: "1",
      skip_disambig: "0",
      t: "Homie"
    }
  }).catch(error => {
    console.error(error);
    message.reply(
      `Something went wrong trying to search for \`${search_terms.join(" ")}\`.`
    );
  });

  if (!response || !response.Results[0]) {
    message.reply(
      `Nothing was found when searching for \`${search_terms.join(" ")}\``
    );
    return;
  }

  if (response.Results.length > 0) {
    message.channel.send(response.Results[0].FirstURL);
  } else {
    message.channel.send(response.RelatedTopics[0].FirstURL);
  }
};

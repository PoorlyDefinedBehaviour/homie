import { Message } from "discord.js";
import { Optional } from "../interfaces";
import { get_args } from "../utils";
import { is_url_valid } from "../validators/YoutubeURL";

export default (client: any, message: Message): void => {
  const { value: args }: Optional<Array<string>, null> = get_args(message);

  if (!args) {
    message.channel.send("No youtube url was provided");
    return;
  }

  if (is_url_valid(args[0])) client.unqueue(args[0]);
};

import { Message } from "discord.js";
import { is_url_valid } from "../validators/YoutubeURL";
import { Optional } from "../../types/Index";
import { get_args } from "../utils/GetArgs";

export default (client: any, message: Message): void => {
  const args: Optional<Array<string>, null> = get_args(message);

  if (!args) {
    message.channel.send("No youtube url was provided");
    return;
  }

  if (is_url_valid(args[0])) client.unqueue_song(args[0]);
};

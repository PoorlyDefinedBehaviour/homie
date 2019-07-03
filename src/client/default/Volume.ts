import { Message } from "discord.js";
import { is_volume_valid } from "../validators";
import { get_args } from "../utils";
import { Optional } from "../interfaces";

export default (client: any, message: Message): void => {
  const { value: args }: Optional<Array<string>, null> = get_args(message);

  if (!args) {
    message.channel.send("No volume was provided");
    return;
  }

  if (is_volume_valid((args[0] as unknown) as number)) client.volume = args[0];
  else message.channel.send("Volume must be between 0 and 1");
};

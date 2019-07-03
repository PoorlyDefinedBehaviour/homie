import { Message } from "discord.js";
import { is_volume_valid } from "../validators";
import { get_args } from "../utils";
import { Optional } from "../interfaces";

export const set_volume = (client: any, message: Message): void => {
  const { value: volume }: Optional<Array<string>, null> = get_args(message);

  if (!volume) {
    message.channel.send("No volume was provided");
    return;
  }

  if (!is_volume_valid((volume as unknown) as number)) client._volume = volume;
  else message.channel.send("Volume must be between 0 and 1");
};

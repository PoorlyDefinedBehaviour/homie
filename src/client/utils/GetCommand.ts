import { Message as DiscordMessage } from "discord.js";
import { Optional } from "../interfaces";

export const get_command = (
  message: DiscordMessage,
  command_prefix: string
): Optional<string, null> => {
  const command = message.content
    .split(" ")[0]
    .replace(new RegExp(`${command_prefix}`), "")
    .toLowerCase();

  return command ? { value: command } : { value: null };
};

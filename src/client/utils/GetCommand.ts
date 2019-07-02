import { Message as DiscordMessage } from "discord.js";

export const get_command = (
  message: DiscordMessage,
  command_prefix: string
): string | null => {
  const command = message.content
    .split(" ")[0]
    .replace(new RegExp(`${command_prefix}`), "")
    .toLowerCase();

  return command || null;
};

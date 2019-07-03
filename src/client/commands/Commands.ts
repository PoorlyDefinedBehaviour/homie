import fs from "fs";
import { Message } from "discord.js";

export default (client: any, message: Message): void => {
  const result: Array<string> = fs
    .readdirSync(__dirname)
    .map((command: string) => `!${command.split(".")[0].toLowerCase()}`);

  message.reply(result);
};

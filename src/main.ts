import { config } from "dotenv";
config();

import { Message } from "discord.js";
import Client from "./client";

function main(): void {
  const bot = new Client(process.env.BOT_TOKEN as string);
  bot.prefix = "!";
  bot.command(
    "test",
    (client: any, message: Message) =>
      !!client && message.channel.send("hello world")
  );
}
main();

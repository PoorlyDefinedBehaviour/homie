import { config } from "dotenv";
config();

import Client from "./client";

function main(): void {
  const bot = new Client(process.env.BOT_TOKEN as string);
  bot.prefix = "!";
}
main();

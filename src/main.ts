import * as dotenv from "dotenv";
dotenv.config();

import Client from "./client";

async function main(): Promise<void> {
  const bot = new Client(String(process.env.BOT_TOKEN));
  bot.prefix = "!";
}
main();

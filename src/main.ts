import { config } from "dotenv";
config();

import Client from "./client";

const main = async (): Promise<void> => {
  const bot = new Client(process.env.BOT_TOKEN as string);
  bot.prefix = "!";
  await bot.start();
};
main();

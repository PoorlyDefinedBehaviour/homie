import * as dotenv from "dotenv";
dotenv.config();

import Client from "./client";

function main(): void {
  const bot = new Client(process.env.BOT_TOKEN as string);
  bot.prefix = "!";
  bot.command("test", () => console.log("hello world"));
}
main();

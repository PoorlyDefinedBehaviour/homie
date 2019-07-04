import { Message } from "discord.js";

export default (client: any, message: Message): void => {
  client.reset_queue();
  client.dispatcher.end();
  message.reply("Cleaned playlist");
};

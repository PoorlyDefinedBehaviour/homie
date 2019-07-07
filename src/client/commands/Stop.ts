import { Message } from "discord.js";

export default (client: any, message: Message): void => {
  client.reset_queue();
  if (client.dispatcher) {
    client.dispatcher.end();
  }
  message.reply("Cleaned playlist");
};

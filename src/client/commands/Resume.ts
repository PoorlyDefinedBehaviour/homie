import { Message } from "discord.js";

export default (client: any, message: Message): void => {
  if (!!client.dispatcher && client.dispatcher.paused)
    client.dispatcher.resume();
  else message.reply("There's nothing being played or song is already resumed");
};

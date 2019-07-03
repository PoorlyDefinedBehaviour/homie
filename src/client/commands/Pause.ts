import { Message } from "discord.js";

export default (client: any, message: Message): void => {
  if (!!client.dispatcher && !client.dispatcher.paused)
    client.dispatcher.pause();
  else message.reply("There's nothing beind played or song is already paused");
};

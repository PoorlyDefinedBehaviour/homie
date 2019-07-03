import { Message } from "discord.js";

export default (client: any, message: Message): void => {
  if (!!client.dispatcher && !client.dispatcher.paused)
    client.pause_dispatcher();
  else message.reply("There's nothing beind played or song ir already paused");
};

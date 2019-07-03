import { Message } from "discord.js";

export default (client: any, message: Message): void => {
  if (client.how_many_songs > 0) client.dispatcher.end();
  else message.reply("There are no songs to be skipped");
};

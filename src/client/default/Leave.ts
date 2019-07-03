import { Message } from "discord.js";
import { Optional } from "../interfaces";

export default (client: any, message: Message): void => {
  const user_channel_id: number = (message.member
    .voiceChannelID as unknown) as number;

  const { value: bot_channel_id }: Optional<number, null> = client.channel_id;

  try {
    if (bot_channel_id === user_channel_id) {
      client.connection.disconnect();
      client.connection = null;
    } else {
      message.reply("You need to be in the same channel as me");
    }
  } catch (error) {
    console.error(error);
    message.reply("Something went wrong trying to leave the channel");
  }
};

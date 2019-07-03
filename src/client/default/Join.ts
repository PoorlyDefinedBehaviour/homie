import { Message } from "discord.js";
import { Optional } from "../interfaces";

export default async (client: any, message: Message): Promise<void> => {
  const user_channel_id: number = (message.member
    .voiceChannelID as unknown) as number;

  const { value: bot_channel_id }: Optional<number, null> = client.channel_id;

  if (user_channel_id !== bot_channel_id)
    client.connection = await message.member.voiceChannel.join();
  else message.reply("I'm already in your channel");
};

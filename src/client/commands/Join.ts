import { Message } from "discord.js";
import { Optional } from "../../types/Index";

export default async (client: any, message: Message): Promise<void> => {
  if (!message.member.voiceChannel) {
    message.reply("You need to be in a voice channel");
    return;
  }

  const user_channel_id: number = (message.member
    .voiceChannelID as unknown) as number;

  const bot_channel_id: Optional<number, null> = client.channel_id;

  if (user_channel_id !== bot_channel_id)
    client.connection = await message.member.voiceChannel.join();
  else message.reply("I'm already in your channel");
};

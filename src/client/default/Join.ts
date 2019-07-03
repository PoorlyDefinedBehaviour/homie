import { Message } from "discord.js";

export default async (client: any, message: Message): Promise<void> => {
  client.connection = await message.member.voiceChannel.join();
};

import ytdl from "ytdl-core";
import { Message } from "discord.js";
import { get_args } from "../utils";

export const play = async (client: any, message: Message): Promise<void> => {
  const args: Array<string> | null = get_args(message);

  if (!args) {
    message.channel.send("No url found");
    return;
  }

  if (!message.member.voiceChannel) {
    message.channel.send("You need to be in a voice channel");
    return;
  }

  client._connection = await message.member.voiceChannel.join();

  client._connection
    .playStream(await ytdl(args[0]))
    .on("end", () => console.log("song ended"))
    .on("error", (error: any) => console.error(error));
};

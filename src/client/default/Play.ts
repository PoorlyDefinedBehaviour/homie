import ytdl from "ytdl-core";
import { Message } from "discord.js";
import { get_args } from "../utils";
import { Optional } from "../interfaces";

export default async (client: any, message: Message): Promise<any> => {
  const { value: args }: Optional<Array<string>, null> = get_args(message);

  if (!args) {
    message.channel.send("No url found");
    return;
  }

  if (!message.member.voiceChannel) {
    message.channel.send("You need to be in a voice channel");
    return;
  }

  client._connection = await message.member.voiceChannel.join();

  const video_info: ytdl.videoInfo = await ytdl.getInfo(args[0]);

  message.channel.send(`Playing: ${video_info.title}`);

  const dispatcher = client._connection
    .playStream(await ytdl(args[0]))
    .on("end", () => console.log("song ended"))
    .on("error", (error: any) => console.error(error));

  dispatcher.setVolume(client._volume);
};

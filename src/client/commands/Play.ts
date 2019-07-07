import ytdl from "ytdl-core";
import { Message } from "discord.js";
import { Optional } from "../types";

export default async (client: any, message: Message): Promise<any> => {
  if (!message.member.voiceChannel) {
    message.channel.send("You need to be in a voice channel");
    return;
  }

  if (client.dispacher) {
    message.reply("I'm already playing");
    return;
  }

  client.connection = await message.member.voiceChannel.join();

  const recursive_play = async () => {
    const song_url: Optional<string, null> = client.get_next_song();

    if (song_url) {
      const video_info: ytdl.videoInfo = await ytdl.getInfo(song_url);

      client.dispatcher = client.connection
        .playStream(await ytdl(song_url))
        .on("end", recursive_play)
        .on("error", (error: any) => console.error(error));

      message.channel.send(`Playing: ${video_info.title}`);

      client.volume = client.volume;
    } else {
      message.channel.send("There are no more songs to play");
      message.member.voiceChannel.leave();
    }
  };
  recursive_play();
};

import ytdl from "ytdl-core";
import { Message } from "discord.js";
import { Optional } from "../../types/Index";
import { get_args } from "../utils/GetArgs";

export default async (client: any, message: Message): Promise<void> => {
  const song: Optional<string[], null> = get_args(message);

  client.reset_queue();
  client.connection = await message.member.voiceChannel.join();

  try {
    if (song) {
      client.dispatcher = client.connection.playArbitraryInput(
        await ytdl(song.join(" "), { filter: "audioonly" })
      );
    }
  } catch (ex) {
    message.channel.send("There are no more songs to play");
    message.member.voiceChannel.leave();
  }
};

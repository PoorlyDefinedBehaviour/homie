import YoutubeSearch from "youtube-api-v3-search";
import { Message } from "discord.js";
import { Optional } from "../types";
import { get_args } from "../utils";

interface YoutubeOptions {
  q: string;
  part: Array<string> | string;
  type: string;
}

export default async (client: any, message: Message): Promise<void> => {
  const search_terms: Optional<Array<string>, null> = get_args(message);

  if (!search_terms) {
    message.reply("You need to provide something to search for");
    return;
  }

  const options: YoutubeOptions = {
    q: search_terms.join(" "),
    part: ["id, snippet"],
    type: "video"
  };

  const videos: any = await YoutubeSearch(
    process.env.YOUTUBE_KEY as string,
    options
  );

  if (videos) {
    const youtube_url: string = `youtube.com/watch?v=${
      videos.items[0].id.videoId
    }`;

    client.queue_song(youtube_url);
    message.reply(
      `Added: ${
        videos.items[0].snippet.title
      } to the queue.\nlink: ${youtube_url}`
    );
  } else {
    message.reply("No videos were found.");
  }
};

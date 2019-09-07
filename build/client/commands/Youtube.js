"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const youtube_api_v3_search_1 = __importDefault(require("youtube-api-v3-search"));
const GetArgs_1 = require("../utils/GetArgs");
exports.default = async (client, message) => {
    const search_terms = GetArgs_1.get_args(message);
    if (!search_terms) {
        message.reply("You need to provide something to search for");
        return;
    }
    const options = {
        q: search_terms.join(" "),
        part: ["id, snippet"],
        type: "video"
    };
    const videos = await youtube_api_v3_search_1.default(process.env.YOUTUBE_KEY, options);
    if (videos) {
        const youtube_url = `youtube.com/watch?v=${videos.items[0].id.videoId}`;
        client.queue_song(youtube_url);
        message.reply(`Added: ${videos.items[0].snippet.title} to the queue.\nUse: \`!unqueue ${youtube_url}\` to remove it from the queue`);
    }
    else {
        message.reply("No videos were found.");
    }
};

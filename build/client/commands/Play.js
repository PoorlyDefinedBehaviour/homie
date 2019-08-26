"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ytdl_core_1 = __importDefault(require("ytdl-core"));
exports.default = async (client, message) => {
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
        const song_url = client.get_next_song();
        if (song_url) {
            const video_info = await ytdl_core_1.default.getInfo(song_url);
            client.dispatcher = client.connection
                .playStream(await ytdl_core_1.default(song_url, { filter: "audioonly" }))
                .on("end", recursive_play)
                .on("error", (error) => console.error(error));
            message.channel.send(`Playing: ${video_info.title}`);
            client.volume = client.volume;
        }
        else {
            message.channel.send("There are no more songs to play");
            message.member.voiceChannel.leave();
        }
    };
    recursive_play();
};

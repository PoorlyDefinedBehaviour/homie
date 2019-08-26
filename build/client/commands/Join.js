"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (client, message) => {
    if (!message.member.voiceChannel) {
        message.reply("You need to be in a voice channel");
        return;
    }
    const user_channel_id = message.member
        .voiceChannelID;
    const bot_channel_id = client.channel_id;
    if (user_channel_id !== bot_channel_id)
        client.connection = await message.member.voiceChannel.join();
    else
        message.reply("I'm already in your channel");
};

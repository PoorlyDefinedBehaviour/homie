"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, message) => {
    const user_channel_id = message.member
        .voiceChannelID;
    const bot_channel_id = client.channel_id;
    try {
        if (bot_channel_id === user_channel_id) {
            client.connection.disconnect();
            client.connection = null;
        }
        else {
            message.reply("You need to be in the same channel as me");
        }
    }
    catch (error) {
        console.error(error);
        message.reply("Something went wrong trying to leave the channel");
    }
};

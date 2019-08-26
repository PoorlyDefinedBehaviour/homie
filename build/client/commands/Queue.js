"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const YoutubeURL_1 = require("../validators/YoutubeURL");
exports.default = (client, message) => {
    const args = utils_1.get_args(message);
    if (!args) {
        message.channel.send("No youtube url was provided");
        return;
    }
    if (YoutubeURL_1.is_url_valid(args[0])) {
        client.queue_song(args[0]);
        message.reply(`There are ${client.how_many_songs} songs in the queue`);
    }
    else
        message.reply("The url is invalid");
};

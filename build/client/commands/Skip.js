"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, message) => {
    if (client.how_many_songs > 0)
        client.dispatcher.end();
    else
        message.reply("There are no songs to be skipped");
};

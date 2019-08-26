"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, message) => {
    if (!!client.dispatcher && client.dispatcher.paused)
        client.dispatcher.resume();
    else
        message.reply("There's nothing being played or song is already resumed");
};

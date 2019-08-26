"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, message) => {
    if (!!client.dispatcher && !client.dispatcher.paused)
        client.dispatcher.pause();
    else
        message.reply("There's nothing beind played or song is already paused");
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client, message) => {
    client.reset_queue();
    if (client.dispatcher) {
        client.dispatcher.end();
    }
    message.reply("Cleaned playlist");
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../validators");
const utils_1 = require("../utils");
exports.default = (client, message) => {
    const args = utils_1.get_args(message);
    if (!args) {
        message.channel.send("No volume was provided");
        return;
    }
    if (validators_1.is_volume_valid(args[0]))
        client.volume = args[0];
    else
        message.channel.send("Volume must be between 0 and 1");
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetArgs_1 = require("../utils/GetArgs");
const Index_1 = require("../validators/Index");
exports.default = (client, message) => {
    const args = GetArgs_1.get_args(message);
    if (!args) {
        message.channel.send("No volume was provided");
        return;
    }
    if (Index_1.is_volume_valid(args[0]))
        client.volume = args[0];
    else
        message.channel.send("Volume must be between 0 and 1");
};

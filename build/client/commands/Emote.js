"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const utils_1 = require("../utils");
const files = fs_1.readdirSync("./src/assets").map((file) => file.toLowerCase());
const get_file_with_extension = (file) => files.find((f) => new RegExp(file, "gi").test(f));
exports.default = async (_, message) => {
    try {
        // @ts-ignore
        const [emote] = utils_1.get_args(message).map((arg) => arg.toLowerCase());
        if (!emote)
            return;
        const file = get_file_with_extension(emote);
        if (!file)
            return;
        message.channel.send({
            file: `./src/assets/${file}`
        });
    }
    catch (ex) {
        console.error(ex);
    }
};

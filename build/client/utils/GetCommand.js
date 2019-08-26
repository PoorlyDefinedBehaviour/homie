"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_command = (message, command_prefix) => {
    const command = message.content
        .split(" ")[0]
        .replace(new RegExp(`${command_prefix}`), "")
        .toLowerCase();
    return command ? command : null;
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.default = () => {
    const commands = new Map();
    const file_names = fs_1.readdirSync(__dirname).map((command) => `${command.split(".")[0].toLowerCase()}`);
    for (const file_name of file_names) {
        if (file_name !== "load") {
            const { default: command } = require(`./${file_name}`);
            commands.set(file_name, command);
        }
    }
    console.log(commands);
    return commands;
};

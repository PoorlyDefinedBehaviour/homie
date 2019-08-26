"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
exports.default = (client, message) => {
    const result = fs_1.default
        .readdirSync(__dirname)
        .map((command) => `!${command.split(".")[0].toLowerCase()}`);
    message.reply(result);
};

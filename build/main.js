"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const client_1 = __importDefault(require("./client"));
const main = async () => {
    const bot = new client_1.default(process.env.BOT_TOKEN);
    bot.prefix = "!";
    await bot.start();
};
main();

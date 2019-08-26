"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_translate_api_1 = __importDefault(require("@vitalets/google-translate-api"));
const utils_1 = require("../utils");
const Language_1 = require("../validators/Language");
exports.default = (client, message) => {
    const args = utils_1.get_args(message);
    if (args) {
        const language = Language_1.is_language_initials(args[0])
            ? args.shift()
            : "pt";
        google_translate_api_1.default(args.join(" "), { to: language }).then((result) => {
            message.reply(`Translation from \`${result.from.language.iso}\` to \`${language}\`\n${result.text}`);
        });
    }
    else {
        message.reply("There's nothing to translate");
    }
};

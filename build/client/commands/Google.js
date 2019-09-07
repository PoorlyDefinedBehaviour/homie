"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_1 = __importDefault(require("request-promise"));
const GetArgs_1 = require("../utils/GetArgs");
exports.default = async (_, message) => {
    const search_terms = GetArgs_1.get_args(message);
    if (!search_terms) {
        message.reply("You need to provide something for me to search for.");
        return;
    }
    const response = await request_promise_1.default({
        headers: { "User-Agent": "Mozilla/5.0" },
        uri: "https://www.googleapis.com/customsearch/v1",
        json: true,
        qs: {
            cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
            key: process.env.GOOGLE_SEARCH_API_KEY,
            num: 1,
            q: search_terms.join(" ")
        }
    }).catch((error) => {
        console.error(error);
        message.reply(`Something went wrong trying to search for \`${search_terms.join(" ")}\`.`);
    });
    if (response.searchInformation.totalResults === "0")
        message.reply(`Nothing was found when searching for \`${search_terms.join(" ")}\``);
    const [result] = response.items;
    if (result) {
        message.reply(result.link);
    }
    else {
        message.reply(`Something went wrong trying to search for \`${search_terms.join(" ")}\``);
    }
};

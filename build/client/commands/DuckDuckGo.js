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
        method: "GET",
        url: "http://api.duckduckgo.com/",
        json: true,
        qs: {
            q: `${search_terms.join(" ")}`,
            format: "json",
            pretty: "1",
            no_redirect: "1",
            skip_disambig: "0",
            t: "Homie"
        }
    }).catch(error => {
        console.error(error);
        message.reply(`Something went wrong trying to search for \`${search_terms.join(" ")}\`.`);
    });
    if (!response || !response.Results) {
        message.reply(`Nothing was found when searching for \`${search_terms.join(" ")}\``);
        return;
    }
    if (response.Results.length > 0) {
        message.channel.send(response.Results[0].FirstURL);
    }
    else {
        message.channel.send(response.RelatedTopics[0].FirstURL);
    }
};

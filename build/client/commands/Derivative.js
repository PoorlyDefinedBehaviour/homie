"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { derivative } = require("mathjs");
const GetArgs_1 = require("../utils/GetArgs");
exports.default = (_, message) => {
    const expression_args = GetArgs_1.get_args(message);
    if (!expression_args)
        return;
    try {
        if (expression_args)
            message.reply(`Result: ${derivative(expression_args.join(" "), "x")}`);
        else
            message.reply("You need to provide an expression, example: 2 + 2.");
    }
    catch (error) {
        console.error(error);
        message.reply(`the expression provided wasn't valid.\n${expression_args &&
            "Expression: " + expression_args.join(" ")}`);
    }
};

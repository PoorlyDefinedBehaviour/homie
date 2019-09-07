"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { evaluate } = require("mathjs");
const GetArgs_1 = require("../utils/GetArgs");
exports.default = (_, message) => {
    const expression_args = GetArgs_1.get_args(message);
    try {
        if (expression_args)
            message.reply(`Result: ${evaluate(expression_args.join(" "))}`);
        else
            message.reply("You need to provide an expression, example: 2 + 2.");
    }
    catch (ex) {
        console.error(ex);
        message.reply(`the expression provided wasn't valid.\n${expression_args &&
            "Expression: " + expression_args.join(" ")}`);
    }
};

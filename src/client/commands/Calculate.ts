const { evaluate } = require("mathjs");
import { Message } from "discord.js";
import { get_args } from "../utils";
import { Optional } from "../types";

export default (client: any, message: Message): void => {
  const expression_args: Optional<Array<string>, null> = get_args(message);

  try {
    if (expression_args)
      message.reply(`Result: ${evaluate(expression_args.join(" "))}`);
    else message.reply("You need to provide an expression, example: 2 + 2.");
  } catch (error) {
    console.error(error);
    message.reply(
      `the expression provided wasn't valid.\n${expression_args &&
        "Expression: " + expression_args.join(" ")}`
    );
  }
};

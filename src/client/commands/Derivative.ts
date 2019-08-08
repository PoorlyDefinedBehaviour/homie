const { derivative } = require("mathjs");
import { Message } from "discord.js";
import { get_args } from "../utils";
import { Optional } from "../types";

export default (_: any, message: Message): void => {
  const expression_args: Optional<Array<string>, null> = get_args(message);
  if (!expression_args) return;

  try {
    if (expression_args)
      message.reply(`Result: ${derivative(expression_args.join(" "), "x")}`);
    else message.reply("You need to provide an expression, example: 2 + 2.");
  } catch (error) {
    console.error(error);
    message.reply(
      `the expression provided wasn't valid.\n${expression_args &&
        "Expression: " + expression_args.join(" ")}`
    );
  }
};

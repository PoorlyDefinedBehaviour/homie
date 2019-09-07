const { evaluate } = require("mathjs");
import { Message } from "discord.js";
import { Optional } from "../../types/Index";
import { get_args } from "../utils/GetArgs";

export default (_: any, message: Message): void => {
  const expression_args: Optional<Array<string>, null> = get_args(message);

  try {
    if (expression_args)
      message.reply(`Result: ${evaluate(expression_args.join(" "))}`);
    else message.reply("You need to provide an expression, example: 2 + 2.");
  } catch (ex) {
    console.error(ex);
    message.reply(
      `the expression provided wasn't valid.\n${expression_args &&
        "Expression: " + expression_args.join(" ")}`
    );
  }
};

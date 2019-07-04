import translate from "@vitalets/google-translate-api";
import { Message } from "discord.js";
import { Optional } from "../types";
import { get_args } from "../utils";
import { is_language_initials } from "../validators/Language";

export default (client: any, message: Message): void => {
  const args: Optional<Array<string>, null> = get_args(message);

  if (args) {
    const language: string = is_language_initials(args[0])
      ? (args.shift() as string)
      : "pt";

    translate(args.join(" "), { to: language }).then((result: any) => {
      message.reply(
        `Translation from \`${result.from.language.iso}\` to \`${language}\`\n${
          result.text
        }`
      );
    });
  } else {
    message.reply("There's nothing to translate");
  }
};

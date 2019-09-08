import { readdirSync } from "fs";
import { Message } from "discord.js";
import { Optional } from "../../types/Index";
import { get_args } from "../utils/GetArgs";

const files: Array<string> = readdirSync("./src/assets").map(
  (file: string): string => file.toLowerCase()
);

const get_file_with_extension = (file: string): Optional<string, undefined> =>
  files.find((f: string): boolean => new RegExp(file, "gi").test(f));

export default async (_: any, message: Message): Promise<void> => {
  try {
    // @ts-ignore
    const [emote]: Optional<Array<string>, null> = get_args(message).map(
      (arg: string): string => arg.toLowerCase()
    );
    if (!emote) return;

    const file: Optional<string, undefined> = get_file_with_extension(emote);
    if (!file) return;

    message.channel.send({
      file: `./src/assets/${file}`
    });
  } catch (ex) {
    console.error(ex);
  }
};

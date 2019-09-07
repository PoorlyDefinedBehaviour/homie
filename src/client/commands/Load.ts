import { readdirSync } from "fs";
import { ActionFunction } from "../../types/Index";

export default (): Map<string, ActionFunction> => {
  const commands: Map<string, ActionFunction> = new Map<string, any>();

  const file_names: Array<string> = readdirSync(__dirname).map(
    (command: string) => `${command.split(".")[0]}`
  );

  for (const file_name of file_names) {
    if (file_name !== "load") {
      const { default: command }: any = require(`./${file_name}`);
      commands.set(file_name.toLowerCase(), command);
    }
  }
  console.log(commands);
  return commands;
};

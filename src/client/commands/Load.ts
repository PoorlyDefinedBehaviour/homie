import fs from "fs";
import { ActionFunction } from '../types';

export default (): Map<string, ActionFunction> => {
  const commands: Map<string, ActionFunction> = new Map<string, any>();

  const file_names: Array<string> = fs
    .readdirSync(__dirname)
    .map((command: string) => `${command.split(".")[0].toLowerCase()}`);

  for (const file_name of file_names) {
    if (file_name !== "load") {
      const { default: command }: any = require(`./${file_name}`);
      commands.set(file_name, command);
    }
  }
  console.log(commands);
  return commands;
};

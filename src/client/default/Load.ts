import * as play from "./Play";
import * as volume from "./Volume";

export const load_default_commands = (): Map<string, any> => {
  const commands: Map<string, any> = new Map<string, any>();

  commands.set("play", play);
  commands.set("volume", volume);

  return commands;
};

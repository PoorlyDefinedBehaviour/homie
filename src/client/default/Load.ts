import play from "./Play";
import volume from "./Volume";

export default (): Map<string, any> => {
  const commands: Map<string, any> = new Map<string, any>();

  commands.set("play", play);
  commands.set("volume", volume);

  return commands;
};

import Play from "./Play";
import Volume from "./Volume";
import Join from "./Join";
import Leave from "./Leave";

export default (): Map<string, any> => {
  const commands: Map<string, any> = new Map<string, any>();

  commands.set("join", Join);
  commands.set("leave", Leave);
  commands.set("play", Play);
  commands.set("volume", Volume);

  return commands;
};

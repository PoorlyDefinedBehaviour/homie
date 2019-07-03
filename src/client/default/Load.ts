import Play from "./Play";
import Volume from "./Volume";
import Join from "./Join";
import Leave from "./Leave";
import Stop from "./Stop";
import Queue from "./Queue";
import Unqueue from "./Unqueue";

export default (): Map<string, any> => {
  const commands: Map<string, any> = new Map<string, any>();

  commands.set("join", Join);
  commands.set("leave", Leave);
  commands.set("queue", Queue);
  commands.set("unqueue", Unqueue);
  commands.set("play", Play);
  commands.set("stop", Stop);
  commands.set("volume", Volume);

  return commands;
};

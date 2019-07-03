import Play from "./Play";
import Volume from "./Volume";
import Join from "./Join";
import Leave from "./Leave";
import Stop from "./Stop";
import Queue from "./Queue";
import Unqueue from "./Unqueue";
import Skip from "./Skip";
import Pause from "./Pause";
import Resume from "./Resume";
import Commands from "./Commands";

export default (): Map<string, any> => {
  const commands: Map<string, any> = new Map<string, any>();

  /**
   * TODO: read commands using fs
   */
  commands.set("commands", Commands);
  commands.set("join", Join);
  commands.set("leave", Leave);
  commands.set("queue", Queue);
  commands.set("unqueue", Unqueue);
  commands.set("play", Play);
  commands.set("stop", Stop);
  commands.set("skip", Skip);
  commands.set("pause", Pause);
  commands.set("resume", Resume);
  commands.set("volume", Volume);

  return commands;
};

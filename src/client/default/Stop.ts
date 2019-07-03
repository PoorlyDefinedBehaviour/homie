import { Message } from "discord.js";

export default (client: any, _: Message): void => {
  client.reset_queue();
  client.end_dispatcher();
};

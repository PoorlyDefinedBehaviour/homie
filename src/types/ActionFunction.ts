import { Message } from "discord.js";

export type ActionFunction = (client: any, message: Message) => void;

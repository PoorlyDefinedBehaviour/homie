import * as Discord from "discord.js";

import { load_default_commands } from "./default";

import { get_command } from "./utils";

import {
  is_prefix_valid,
  is_command_name_valid,
  is_action_valid,
  command_exists
} from "./validators";

import {
  InvalidPrefix,
  InvalidCommand,
  InvalidAction,
  CommandExists
} from "./errors";

class Client {
  private _instance: Discord.Client;
  private _prefix: string = "!";
  private _commands: Map<string, any>;
  private _volume: number = 0.4;
  private _connection: Discord.VoiceConnection | null = null;

  constructor(private readonly bot_token: string) {
    console.log(this._volume, this._connection);
    this._instance = new Discord.Client();
    this._instance.login(this.bot_token);

    this._commands = load_default_commands();
    console.log(this._commands);
    this._instance.on("message", message => this.handle_messages(message));
  }

  public set prefix(prefix: string) {
    if (!is_prefix_valid(prefix)) InvalidPrefix.throw();
    this._prefix = prefix;
  }

  public command(command: string, action: any): void {
    if (command_exists(this._commands, command)) CommandExists.throw();
    if (!is_command_name_valid(command)) InvalidCommand.throw();
    if (!is_action_valid(action)) InvalidAction.throw();

    this._commands.set(command.toLowerCase(), action);
  }

  public handle_messages(message: Discord.Message) {
    try {
      if (!message.content.startsWith(this._prefix) || message.author.bot)
        return;

      const command: string | null = get_command(message, this._prefix);

      if (command) this._commands.get(command as string)(this, message);
    } catch (error) {
      console.error("handle_messages", error);
      message.reply("there was an error trying to execute that command!");
    }
  }
}

export default Client;

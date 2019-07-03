import * as Discord from "discord.js";

import load_default_commands from "./default/Load";

import { get_command } from "./utils";

import { ActionFunction } from "./types";

import { Optional } from "./interfaces";

import {
  is_prefix_valid,
  is_command_name_valid,
  is_action_valid,
  command_exists,
  is_volume_valid
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
  private _volume: number = 0.1;
  // @ts-ignore
  private _connection: Discord.VoiceConnection | null = null;
  private _dispatcher: any = null;

  constructor(private readonly bot_token: string) {
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

  public command(command: string, action: ActionFunction): void {
    if (command_exists(this._commands, command)) CommandExists.throw();
    if (!is_command_name_valid(command)) InvalidCommand.throw();
    if (!is_action_valid(action)) InvalidAction.throw();

    this._commands.set(command.toLowerCase(), action);
  }

  public handle_messages(message: Discord.Message) {
    try {
      if (!message.content.startsWith(this._prefix) || message.author.bot)
        return;

      const { value: command }: Optional<string, null> = get_command(
        message,
        this._prefix
      );

      const action: ActionFunction = this._commands.get(command as string);
      action(this, message);
    } catch (error) {
      console.error("handle_messages", error);
      message.reply("there was an error trying to execute that command!");
    }
  }

  public get channel_id(): Optional<number, null> {
    return !!this._connection
      ? {
          value: (this._connection.channel.id as unknown) as number
        }
      : { value: null };
  }

  public set volume(volume: number) {
    if (!is_volume_valid(volume)) return;
    this._volume = volume;
    if (this._dispatcher) this._dispatcher.setVolume(this._volume);
  }

  public get volume(): number {
    return this._volume;
  }

  public set dispatcher(dispatcher: any) {
    this._dispatcher = dispatcher;
  }

  public set connection(connection: any) {
    this._connection = connection;
  }

  public get connection() {
    return this._connection;
  }
}

export default Client;

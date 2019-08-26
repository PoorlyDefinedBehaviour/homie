import * as Discord from "discord.js";

import load_default_commands from "./commands/Load";

import { get_command } from "./utils";

import { ActionFunction, Optional } from "./types";

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

import { is_url_valid } from "./validators/YoutubeURL";

class Client {
  private _self: boolean;
  private _instance: Discord.Client;
  private _prefix: string = "!";
  private _commands: Map<string, any>;
  private _volume: number = 0.1;
  private _connection: Optional<Discord.VoiceConnection, null> = null;
  private _dispatcher: any = null;
  private _song_queue: Array<string> = [];

  constructor(private readonly bot_token: string) {}

  private get_similar_command(command: string): Optional<string, null> {
    const regex = new RegExp(command, "gi");

    const result: Optional<string, null> = Array.from(
      this._commands.keys()
    ).filter((_command: string) => regex.test(_command))[0];

    return result;
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

  public start = async () => {
    this._instance = new Discord.Client();
    await this._instance.login(this.bot_token);
    this._commands = load_default_commands();
    this._self = (process.env.SELF as unknown) as boolean;
    this._instance.on("message", message => this.handle_messages(message));
  };

  public handle_messages = async (message: Discord.Message) => {
    try {
      const command: Optional<string, null> = get_command(
        message,
        this._prefix
      );

      const action: ActionFunction = this._commands.get(command as string);
      if (action) {
        action(this, message);
      } else {
        if (this._self) return;

        const similar_command: Optional<
          string,
          null
        > = this.get_similar_command(command as string);

        message.reply(
          similar_command
            ? `Command not found, did you mean !${similar_command}?`
            : "Type !commands to see the commands available"
        );
      }

      await message.delete();
    } catch (error) {
      console.error("handle_messages", error);
      message.reply("there was an error trying to execute that command!");
    }
  };

  public get_next_song(): Optional<string, null> {
    return this._song_queue.length > 0
      ? (this._song_queue.shift() as string)
      : null;
  }

  public queue_song(url: string): void {
    if (is_url_valid(url)) this._song_queue.push(url);
  }

  public unqueue_song(url: string): void {
    this._song_queue = this._song_queue.filter(
      (youtube_url: string) => youtube_url !== url
    );
  }

  public reset_queue(): void {
    this._song_queue = [];
  }

  public get how_many_songs() {
    return this._song_queue.length;
  }

  public get channel_id(): Optional<number, null> {
    return !!this._connection
      ? ((this._connection.channel.id as unknown) as number)
      : null;
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

  public get dispatcher() {
    return this._dispatcher;
  }

  public set connection(connection: any) {
    this._connection = connection;
  }

  public get connection() {
    return this._connection;
  }
}

export default Client;

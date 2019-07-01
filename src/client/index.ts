import * as Discord from "discord.js";

import { Lexer } from "../Lexer/Index";

import {
  is_prefix_valid,
  is_command_name_valid,
  is_action_valid,
  command_exists
} from "./validators/Validators";

import {
  InvalidPrefix,
  InvalidCommand,
  InvalidAction,
  CommandExists
} from "./errors/Errors";

class Client {
  private _instance: Discord.Client;
  private _prefix: string = "!";
  private _commands: Map<string, any> = new Map<string, any>();

  constructor(private readonly bot_token: string) {
    this._instance = new Discord.Client();
    this._instance.login(this.bot_token);

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

    this._commands.set(command, action);
    this.add_listener(command);
  }

  private add_listener(command: string): void {}

  public handle_messages(message: Discord.Message) {
    if (!message.content.startsWith(this._prefix)) return;
    const token: any = Lexer.tokenize(message);

    console.log(token["MessageContent"][0]);
  }
}

export default Client;

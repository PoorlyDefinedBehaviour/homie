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

    this._instance.on("message", this.handle_messages);
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

  private handle_messages(message: Discord.Message) {
    const tokens: Array<string> = Lexer.tokenize(message);
  }
}

export default Client;

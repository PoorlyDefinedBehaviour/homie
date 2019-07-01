import * as Discord from "discord.js";

import {
  is_prefix_valid,
  is_command_name_valid
} from "./validators/Validators";

import { InvalidPrefix, InvalidCommandName } from "./errors/Errors";

interface Command {
  name: string;
  action: any;
}

class Client {
  private _instance: Discord.Client;
  private _prefix: string = "";

  constructor(private readonly bot_token: string) {
    this._instance = new Discord.Client();
    this._instance.login(this.bot_token);
  }

  public set prefix(prefix: string) {
    if (!is_prefix_valid(prefix)) InvalidPrefix.throw();
    this._prefix = prefix;
  }

  public command(command_name: string, action: any): void {
    if (!is_command_name_valid(command_name)) InvalidCommandName.throw();
  }
}

export default Client;

import * as Discord from "discord.js";

import { InvalidPrefixError } from "./errors/Errors";

class Client {
  private _instance: Discord.Client;
  private _prefix: string = "";

  constructor(private readonly bot_token: string) {
    this._instance = new Discord.Client();
    this._instance.login(this.bot_token);
  }

  public set prefix(prefix: string) {
    if (!this.is_prefix_valid(prefix)) InvalidPrefixError.throw();
    this._prefix = prefix;
  }

  private is_prefix_valid(prefix: string): boolean {
    const trimmed_prefix: string = prefix.replace(new RegExp(" ", "g"), "");
    return trimmed_prefix.length > 0 && trimmed_prefix.length < 4;
  }
}

export default Client;

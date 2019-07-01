import * as Discord from "discord.js";

class Client {
  private _instance: Discord.Client;

  constructor(private readonly bot_token: string) {
    this._instance = new Discord.Client();
    this._instance.login(this.bot_token);
    console.log(this._instance);
  }

  public async connect(): Promise<Boolean> {
    console.log("connecting...", this.bot_token);

    return true;
  }
}

export default Client;

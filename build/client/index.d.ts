import * as Discord from "discord.js";
import { ActionFunction, Optional } from "./types";
declare class Client {
    private readonly bot_token;
    private _self;
    private _instance;
    private _prefix;
    private _commands;
    private _volume;
    private _connection;
    private _dispatcher;
    private _song_queue;
    constructor(bot_token: string);
    private get_similar_command;
    prefix: string;
    command(command: string, action: ActionFunction): void;
    start: () => Promise<void>;
    handle_messages: (message: Discord.Message) => Promise<void>;
    get_next_song(): Optional<string, null>;
    queue_song(url: string): void;
    unqueue_song(url: string): void;
    reset_queue(): void;
    readonly how_many_songs: number;
    readonly channel_id: Optional<number, null>;
    volume: number;
    dispatcher: any;
    connection: any;
}
export default Client;

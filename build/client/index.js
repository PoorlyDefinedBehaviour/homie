"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const Load_1 = __importDefault(require("./commands/Load"));
const utils_1 = require("./utils");
const validators_1 = require("./validators");
const errors_1 = require("./errors");
const YoutubeURL_1 = require("./validators/YoutubeURL");
class Client {
    constructor(bot_token) {
        this.bot_token = bot_token;
        this._prefix = "!";
        this._volume = 0.1;
        this._connection = null;
        this._dispatcher = null;
        this._song_queue = [];
        this.start = async () => {
            this._instance = new Discord.Client();
            await this._instance.login(this.bot_token);
            this._commands = Load_1.default();
            this._self = process.env.SELF;
            this._instance.on("message", message => this.handle_messages(message));
        };
        this.handle_messages = async (message) => {
            try {
                const command = utils_1.get_command(message, this._prefix);
                const action = this._commands.get(command);
                if (action) {
                    action(this, message);
                }
                else {
                    if (this._self)
                        return;
                    const similar_command = this.get_similar_command(command);
                    message.reply(similar_command
                        ? `Command not found, did you mean !${similar_command}?`
                        : "Type !commands to see the commands available");
                }
                await message.delete();
            }
            catch (error) {
                console.error("handle_messages", error);
                message.reply("there was an error trying to execute that command!");
            }
        };
    }
    get_similar_command(command) {
        const regex = new RegExp(command, "gi");
        const result = Array.from(this._commands.keys()).filter((_command) => regex.test(_command))[0];
        return result;
    }
    set prefix(prefix) {
        if (!validators_1.is_prefix_valid(prefix))
            errors_1.InvalidPrefix.throw();
        this._prefix = prefix;
    }
    command(command, action) {
        if (validators_1.command_exists(this._commands, command))
            errors_1.CommandExists.throw();
        if (!validators_1.is_command_name_valid(command))
            errors_1.InvalidCommand.throw();
        if (!validators_1.is_action_valid(action))
            errors_1.InvalidAction.throw();
        this._commands.set(command.toLowerCase(), action);
    }
    get_next_song() {
        return this._song_queue.length > 0
            ? this._song_queue.shift()
            : null;
    }
    queue_song(url) {
        if (YoutubeURL_1.is_url_valid(url))
            this._song_queue.push(url);
    }
    unqueue_song(url) {
        this._song_queue = this._song_queue.filter((youtube_url) => youtube_url !== url);
    }
    reset_queue() {
        this._song_queue = [];
    }
    get how_many_songs() {
        return this._song_queue.length;
    }
    get channel_id() {
        return !!this._connection
            ? this._connection.channel.id
            : null;
    }
    set volume(volume) {
        if (!validators_1.is_volume_valid(volume))
            return;
        this._volume = volume;
        if (this._dispatcher)
            this._dispatcher.setVolume(this._volume);
    }
    get volume() {
        return this._volume;
    }
    set dispatcher(dispatcher) {
        this._dispatcher = dispatcher;
    }
    get dispatcher() {
        return this._dispatcher;
    }
    set connection(connection) {
        this._connection = connection;
    }
    get connection() {
        return this._connection;
    }
}
exports.default = Client;

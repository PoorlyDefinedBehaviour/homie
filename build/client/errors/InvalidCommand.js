"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidCommand {
    static throw() {
        throw new Error("Command name must bigger than 1 character");
    }
}
exports.InvalidCommand = InvalidCommand;

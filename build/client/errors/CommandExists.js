"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandExists {
    static throw() {
        throw new Error("A command with that name already exists");
    }
}
exports.CommandExists = CommandExists;

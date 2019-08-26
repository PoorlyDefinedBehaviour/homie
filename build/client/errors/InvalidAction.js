"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidAction {
    static throw() {
        throw new Error("Action must be a function that acts when the command is used");
    }
}
exports.InvalidAction = InvalidAction;

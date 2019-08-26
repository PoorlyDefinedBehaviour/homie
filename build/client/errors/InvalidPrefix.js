"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidPrefix {
    static throw() {
        throw new Error("Prefix must be between 1 and 3 characters long");
    }
}
exports.InvalidPrefix = InvalidPrefix;

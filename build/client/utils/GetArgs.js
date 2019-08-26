"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_args = (message) => {
    const args = message.content.split(" ").slice(1);
    return args.length > 0 ? args : null;
};

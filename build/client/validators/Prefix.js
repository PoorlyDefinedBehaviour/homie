"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_prefix_valid = (prefix) => {
    const trimmed_prefix = prefix.replace(new RegExp(" ", "g"), "");
    return trimmed_prefix.length > 0 && trimmed_prefix.length < 4;
};

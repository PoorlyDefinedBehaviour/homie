"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_command_name_valid = (name) => name.replace(new RegExp(" ", "g"), "").length > 0;

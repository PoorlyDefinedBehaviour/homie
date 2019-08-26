"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ytdl_core_1 = require("ytdl-core");
exports.is_url_valid = (url) => ytdl_core_1.validateURL(url);

import { validateURL } from "ytdl-core";

export const is_url_valid = (url: string): boolean => validateURL(url);

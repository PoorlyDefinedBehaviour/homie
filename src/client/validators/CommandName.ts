export const is_command_name_valid = (name: string): boolean =>
  name.replace(new RegExp(" ", "g"), "").length > 0;

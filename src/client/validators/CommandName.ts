export const is_command_name_valid = (name: string) =>
  name.replace(new RegExp(" ", "g"), "").length > 0;

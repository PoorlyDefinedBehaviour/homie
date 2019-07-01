export const is_prefix_valid = (prefix: string): boolean => {
  const trimmed_prefix: string = prefix.replace(new RegExp(" ", "g"), "");
  return trimmed_prefix.length > 0 && trimmed_prefix.length < 4;
};

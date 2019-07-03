import { Optional } from "../interfaces";

export const get_args = (message: any): Optional<Array<string>, null> => {
  const args: Array<string> = message.content.split(" ").slice(1);

  return args.length > 0 ? { value: args } : { value: null };
};

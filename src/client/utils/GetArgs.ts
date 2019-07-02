export const get_args = (message: any): Array<string> | null => {
  //Token["MessageArgs"] = message.content.split(" ");
  const args: Array<string> = message.content.split(" ").slice(1);

  return args.length > 0 ? args : null;
};

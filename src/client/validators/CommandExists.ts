export const command_exists = (
  commands: Map<string, any>,
  command: string
): boolean => !!commands.get(command);

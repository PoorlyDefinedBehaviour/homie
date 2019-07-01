export class InvalidCommandName {
  static throw(): void {
    throw new Error("Command name must bigger than 1 character");
  }
}

export class CommandExists {
  static throw(): void {
    throw new Error("A command with that name already exists");
  }
}

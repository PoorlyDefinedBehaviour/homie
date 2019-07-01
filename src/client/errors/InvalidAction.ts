export class InvalidAction {
  static throw(): void {
    throw new Error(
      "Action must be a function that acts when the command is used"
    );
  }
}

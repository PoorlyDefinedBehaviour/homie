export class InvalidPrefix {
  static throw(): void {
    throw new Error("Prefix must be between 1 and 3 characters long");
  }
}

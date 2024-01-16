export default class InvalidDataException extends Error {
  constructor(message: string) {
    const MESSAGE = "Invalid data provided.";
    super(message || MESSAGE);
  }
}

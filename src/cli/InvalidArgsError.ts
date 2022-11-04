class InvalidArgsError extends Error {
  public usage: string = '';

  constructor(message?: string) {
    super(message || 'Invalid arguments');

    // Set the prototype explicitly.
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, InvalidArgsError.prototype);
  }
}

export { InvalidArgsError };

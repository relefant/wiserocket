class CmdError extends Error {
  public usage: string = '';

  constructor(message?: string) {
    super(message || 'Command error');

    // Set the prototype explicitly.
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, CmdError.prototype);
  }
}

export { CmdError };

class SystemError extends Error {
  constructor(message: string, scope: string) {
    const completeMessage = `[TAPSI][${scope}]: ${message}`;

    super(completeMessage);

    this.name = "SystemError";
  }
}

export default SystemError;

const logger = (
  message: string,
  scope: string,
  type: "error" | "default" | "warning" = "default",
) => {
  const typesMap: Record<typeof type, Console["log"]> = {
    /* eslint-disable no-console */
    error: console.error,
    default: console.log,
    warning: console.warn,
    /* eslint-enable no-console */
  };

  const logFn = typesMap[type];
  const completeMessage = `[TAPSI][${scope}]: ${message}`;

  logFn(completeMessage);
};

export default logger;

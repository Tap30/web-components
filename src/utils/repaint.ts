// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const runAfterRepaint = <T extends (...args: any) => any>(
  fn: T,
): void => {
  window.requestAnimationFrame(() => {
    window.setTimeout(fn, 0);
  });
};

export const waitForRepaint = (): Promise<void> => {
  return new Promise(resolve => {
    runAfterRepaint(resolve);
  });
};

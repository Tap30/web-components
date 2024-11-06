/**
 * Runs a callback after the next repaint.
 */
export const runAfterRepaint = (fn: () => void): void => {
  window.requestAnimationFrame(() => {
    window.setTimeout(fn, 0);
  });
};

/**
 * Returns a promise that resolves after the next repaint.
 */
export const waitForRepaint = (): Promise<void> => {
  return new Promise(resolve => {
    runAfterRepaint(resolve);
  });
};

/**
 * Runs a callback immediately after the next frame is
 * painted and then after one additional event loop tick.
 *
 * This can be helpful for operations that need to wait
 * until the next repaint is complete before performing
 * a follow-up task.
 */
export const runAfterRepaint = (fn: () => void): void => {
  window.requestAnimationFrame(() => {
    window.setTimeout(fn, 0);
  });
};

/**
 * Runs a callback after the current call stack is cleared
 * (i.e., after a tick of the event loop) and then aligns
 * it with the next repaint.
 *
 * This ensures that any micro-tasks or pending callbacks
 * are processed first, and fn executes right before the
 * next frame is rendered.
 */
export const executeAfterDeferredRepaint = (fn: () => void): void => {
  window.setTimeout(() => {
    window.requestAnimationFrame(fn);
  }, 0);
};

/**
 * Returns a promise that resolves immediately after the
 * next frame is painted and then after one additional
 * event loop tick.
 *
 * This can be helpful for operations that need to wait
 * until the next repaint is complete before performing
 * a follow-up task.
 */
export const waitForRepaint = (): Promise<void> => {
  return new Promise(resolve => {
    runAfterRepaint(resolve);
  });
};

/**
 * Returns a promise that resolves after the current call
 * stack is cleared (i.e., after a tick of the event loop)
 * and then aligns it with the next repaint.
 *
 * This ensures that any micro-tasks or pending callbacks
 * are processed first, and resolves right before the next
 * frame is rendered.
 */
export const waitForDeferredRepaintExecution = (): Promise<void> => {
  return new Promise(resolve => {
    executeAfterDeferredRepaint(resolve);
  });
};

/**
 * Waits a microtask.
 *
 * Schedules a microtask but should be used to allow any other microtasks
 * (like other event handlers) to complete first.
 */
export const waitAMicrotask = (): Promise<void> => {
  return Promise.resolve(void 0);
};

/**
 * Waits an event loop tick.
 *
 * This can be useful for deferring the execution of some code until
 * after the current call stack has cleared and other microtasks have
 * been processed.
 */
export const waitAnEventLoopTick = (): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve);
  });
};

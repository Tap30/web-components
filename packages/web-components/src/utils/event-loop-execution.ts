/**
 * Runs a callback as soon as possible after next repaint.
 *
 * This can be helpful for operations that need to wait until the
 * next repaint is complete before performing a follow-up task.
 * When you need a small delay after the next repaint, perhaps for
 * batching DOM updates or deferring non-critical tasks right after a
 * frame is rendered.
 */
export const runAfterRepaint = (fn: () => void): void => {
  window.requestAnimationFrame(() => {
    window.setTimeout(fn, 0);
  });
};

/**
 * Asynchronously waits for the next browser repaint to complete before resolving.
 *
 * This Promise resolves after `runAfterRepaint` has executed its internal logic,
 * making it suitable for tasks that depend on the visual state being fully updated
 * and rendered on screen.
 */
export const waitForNextRepaint = (): Promise<void> => {
  return new Promise(resolve => {
    runAfterRepaint(resolve);
  });
};

/**
 * Runs a callback after any micro-tasks or pending callbacks are
 * processed and just before the next repaint.
 *
 * This can be useful if you want to ensure the callback runs at the
 * optimal time for rendering updates but want to defer its execution.
 */
export const runBeforeRepaint = (fn: () => void): void => {
  window.setTimeout(() => {
    window.requestAnimationFrame(fn);
  }, 0);
};

/**
 * Asynchronously waits for any pending event loop tasks to process,
 * and then resolves just before the next browser repaint.
 *
 * This Promise wraps `runBeforeRepaint`, allowing you to defer execution
 * to an optimal time for rendering-related updates, but after other
 * immediate background tasks like microtasks are handled.
 */
export const waitForBeforeRepaint = (): Promise<void> => {
  return new Promise(resolve => {
    runBeforeRepaint(resolve);
  });
};

/**
 * Runs a callback immediately before the next repaint.
 *
 * This is ideal for animations or visual updates that should occur
 * right before the next screen repaint for smooth and efficient
 * rendering.
 */
export const runImmediatelyBeforeRepaint = (fn: () => void): void => {
  window.requestAnimationFrame(() => {
    fn();
  });
};

/**
 * Asynchronously waits for the precise moment immediately before the next repaint
 * to resolve.
 *
 * This Promise leverages `runImmediatelyBeforeRepaint` for tight synchronization
 * with the browser's rendering cycle, ideal for animations or visual updates
 * that require maximum smoothness.
 */
export const waitForImmediatelyBeforeRepaint = (): Promise<void> => {
  return new Promise(resolve => {
    runImmediatelyBeforeRepaint(resolve);
  });
};

/**
 * Runs a callback immediately after the next event loop tick.
 *
 * This can be useful for deferring the execution of some code until
 * after the current call stack has cleared and other microtasks have
 * been processed.
 */
export const runAfterEventLoopTick = (fn: () => void): void => {
  window.setTimeout(() => {
    fn();
  }, 0);
};

/**
 * Asynchronously waits for the completion of the current event loop tick
 * (including all microtasks) before resolving.
 *
 * This Promise wraps `runAfterEventLoopTick`, useful for deferring code
 * until the current call stack has cleared and all immediate asynchronous
 * operations (like other Promises) have processed.
 */
export const waitForEventLoopTick = (): Promise<void> => {
  return new Promise(resolve => {
    runAfterEventLoopTick(resolve);
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

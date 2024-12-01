/**
 * Await it to run code after a microtask.
 *
 * Schedules a microtask but should be used to allow any other microtasks
 * (like other event handlers) to complete first.
 */
const waitAMicrotask = async () => {
  return Promise.resolve<void>(void 0);
};

export default waitAMicrotask;

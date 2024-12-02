import type { DirectiveResult } from "lit/async-directive";
import { ref, type RefDirective } from "lit/directives/ref.js";

type CleanupFunction = () => void | undefined;

export type DisposableCallback = (element: Element) => void | CleanupFunction;
export type DisposableRefCallback = DirectiveResult<typeof RefDirective>;

/**
 * A function that helps you to run some code when a DOM node mounts/dismounts.
 *
 * @param callback The disposable callback effect to invoke when DOM node mounts/dismounts.
 */
const createDisposableRefCallback = (
  callback: DisposableCallback,
): DisposableRefCallback => {
  let cleanup: CleanupFunction | null = null;

  // Define the disposable ref callback function
  const disposableRefCallback = (element?: Element) => {
    // If there's an existing cleanup function, call it and reset to null
    if (cleanup !== null) {
      cleanup();
      cleanup = null;
    }

    if (!element) return;

    // Call the callback with the element and store the cleanup function
    cleanup = callback(element) ?? null;
  };

  // Return the ref directive with the disposable ref callback
  return ref(disposableRefCallback);
};

export default createDisposableRefCallback;

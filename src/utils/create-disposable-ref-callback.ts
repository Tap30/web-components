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

  const disposableRefCallback = (element?: Element) => {
    if (cleanup !== null) {
      cleanup();
      cleanup = null;
    }

    if (!element) return;

    cleanup = callback(element) ?? null;
  };

  return ref(disposableRefCallback);
};

export default createDisposableRefCallback;

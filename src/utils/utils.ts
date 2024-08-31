export function debounce<T>(func: (...args: T[]) => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: T[]) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, delay);
  };
}

/**
 * Re-dispatches an event from the provided element.
 * source code: https://github.com/material-components/material-web/blob/a9ee4f5bc1d6702e5dc352eefed13a1d849577e3/internal/events/redispatch-event.ts#L28
 */
export function redispatchEvent(element: Element, event: Event) {
  // For bubbling events in SSR light DOM (or composed), stop their propagation
  // and dispatch the copy.
  if (event.bubbles && (!element.shadowRoot || event.composed)) {
    event.stopPropagation();
  }

  const copy = Reflect.construct(event.constructor, [event.type, event]);
  const dispatched = element.dispatchEvent(copy);
  if (!dispatched) {
    event.preventDefault();
  }

  return dispatched;
}
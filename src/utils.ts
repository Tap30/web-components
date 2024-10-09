// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
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

  const newEvent = Reflect.construct(event.constructor, [
    event.type,
    event,
  ]) as Event;

  const dispatched = element.dispatchEvent(newEvent);

  if (!dispatched) event.preventDefault();

  return dispatched;
}

/**
 * Re-dispatches an event from the provided element.
 *
 * cherry-picked from: https://github.com/material-components/material-web/blob/a9ee4f5bc1d6702e5dc352eefed13a1d849577e3/internal/events/redispatch-event.ts#L28
 */
const redispatchEvent = (element: Element, event: Event): boolean => {
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
};

export default redispatchEvent;

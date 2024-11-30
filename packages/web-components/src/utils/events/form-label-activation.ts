/**
 * Dispatches a click event to the given element that triggers a native action,
 * but is not composed and therefore is not seen outside the element.
 *
 * This is useful for responding to an external click event on the host element
 * that should trigger an internal action like a button click.
 *
 * Note, a helper is provided because setting this up correctly is a bit tricky.
 * In particular, calling `click` on an element creates a composed event, which
 * is not desirable, and a manually dispatched event must specifically be a
 * `MouseEvent` to trigger a native action.
 *
 * @example
 * hostClickListener = (event: MouseEvent) {
 *   if (isActivationClick(event)) {
 *     this.dispatchActivationClick(this.buttonElement);
 *   }
 * }
 *
 */
export const dispatchActivationClick = (element: HTMLElement) => {
  const event = new MouseEvent("click", { bubbles: true });

  element.dispatchEvent(event);

  return event;
};

/**
 * Returns true if the click event should trigger an activation behavior. The
 * behavior is defined by the element and is whatever it should do when
 * clicked.
 *
 * Typically when an element needs to handle a click, the click is generated
 * from within the element and an event listener within the element implements
 * the needed behavior; however, it's possible to fire a click directly
 * at the element that the element should handle. This method helps
 * distinguish these "external" clicks.
 *
 * An "external" click can be triggered in a number of ways: via a click
 * on an associated label for a form  associated element, calling
 * `element.click()`, or calling
 * `element.dispatchEvent(new MouseEvent('click', ...))`.
 *
 * Also works around Firefox issue
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1804576 by squelching
 * events for a microtask after called.
 *
 * @example
 * hostClickListener = (event: MouseEvent) {
 *   if (isActivationClick(event)) {
 *     this.dispatchActivationClick(this.buttonElement);
 *   }
 * }
 *
 */
export const isActivationClick = (event: Event) => {
  if (event.currentTarget !== event.target) return false;

  // Event must not be retargeted from shadowRoot.
  if (event.composedPath()[0] !== event.target) return false;

  if ((event.target as EventTarget & { disabled: boolean }).disabled) {
    return false;
  }

  // This is an activation if the event should not be squelched.
  return !shouldSquelchEvent(event);
};

// Ignore events for one microtask only.
let isSquelchingEvents = false;

const squelchEventsForMicrotask = async () => {
  isSquelchingEvents = true;

  // Need to pause for just one microtask.
  await new Promise<void>(resolve => {
    resolve();
  });

  isSquelchingEvents = false;
};

// TODO: (https://bugzilla.mozilla.org/show_bug.cgi?id=1804576)
// Remove when Firefox bug is addressed.
const shouldSquelchEvent = (event: Event) => {
  const squelched = isSquelchingEvents;

  if (squelched) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  void squelchEventsForMicrotask();

  return squelched;
};

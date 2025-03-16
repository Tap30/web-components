import type { Page } from "@playwright/test";

type OverrideProperties<Origin, Destination> = Destination &
  Omit<Origin, keyof Destination>;

declare const p: Page;

export type RunnerPage = OverrideProperties<
  Page,
  {
    /**
     * Find an element that matches the selector, which is the same as
     * `document.querySelector(selector)`. Use `>>>` within the
     * selector to find an element within the host element's shadow root.
     * For example, to select the first `div` inside of the component
     * `my-cmp`, the call would be `page.find('my-cmp >>> div')`.
     * Returns `null` if an element was not found.
     */
    find: (selector: FindSelector) => Promise<RunnerElement>;
    /**
     * Find all elements that match the selector, which is the same as
     * `document.querySelectorAll(selector)`. Use `>>>` within the
     * selector to find elements within the host element's shadow root.
     * For example, to select all of the `li` elements inside of the component
     * `my-cmp`, the call would be `page.findAll('my-cmp >>> li')`.
     * Returns an empty array if no elements were found.
     */
    findAll: (selector: string) => Promise<RunnerElement[]>;
    /**
     * Used to test if an event was, or was not dispatched. This method
     * returns a promise, that resolves with an EventSpy. The EventSpy
     * can be used along with `expect(spy).toHaveReceivedEvent()`,
     * `expect(spy).toHaveReceivedEventTimes(x)` and
     * `expect(spy).toHaveReceivedEventDetail({...})`.
     */
    spyOnEvent: (
      eventName: string,
      selector?: "window" | "document",
    ) => Promise<EventSpy>;
    /**
     * Waits for the event to be received on `window`.
     */
    waitForEvent: (
      eventName: string,
      selector?: "window" | "document",
    ) => Promise<void>;
  }
>;

export type RunnerPageInternal = OverrideProperties<
  RunnerPage,
  {
    isClosed: () => boolean;
    _elements: RunnerElementInternal[];
    _events: Map<number, unknown>;
    _eventIds: number;
    _close: () => Promise<void>;
  }
>;

import type { Locator, Page } from "@playwright/test";
import { globalMockReferenceKey } from "./constants.ts";
import type { MockFn } from "./types.ts";

export type EventsMockState = Record<string, Array<[MockFn, AbortController]>>;

const attachMockedEvent = async (
  locator: Locator,
  eventName: string,
  mockFn: MockFn,
): Promise<void> => {
  await locator.evaluateHandle(
    (element, [gmrk, eventName, mockFn]) => {
      if (!element) {
        throw new Error(
          "Expected an element with the specified locator to be found on the page.",
        );
      }

      const globalMock = window[gmrk];

      if (!globalMock) {
        throw new Error(
          [
            "Global mock object not found.",
            "Ensure that the global mock object is properly initialized.",
          ].join(" "),
        );
      }

      if (!globalMock.events) {
        throw new Error(
          [
            "Global events mock object not found.",
            "Ensure that the global events mock object is properly initialized.",
          ].join(" "),
        );
      }

      const listeners = globalMock.events[eventName] ?? [];
      const abortController = new AbortController();

      globalMock.events[eventName] = listeners;

      element.addEventListener(
        eventName,
        (...args) => {
          mockFn.called = true;
          mockFn.callCount += 1;
          mockFn.calls.push(args);
        },
        { signal: abortController.signal },
      );

      globalMock.events[eventName].push([mockFn, abortController]);
      globalMock.mockFns.push(mockFn);
    },
    [globalMockReferenceKey, eventName, mockFn] as const,
  );
};

const detachMockedEvent = async (
  locator: Locator,
  eventName: string,
  mockFn: MockFn,
): Promise<void> => {
  await locator.evaluateHandle(
    (element, [gmrk, eventName, mockFn]) => {
      if (!element) {
        throw new Error(
          [
            "Element not found.",
            "Expected an element with the specified locator to be present on the page.",
          ].join(" "),
        );
      }

      const globalMock = window[gmrk];

      if (!globalMock) {
        throw new Error(
          [
            "Global mock object not found.",
            "Ensure that the global mock object is properly initialized.",
          ].join(" "),
        );
      }

      if (!globalMock.events) {
        throw new Error(
          [
            "Global events mock object not found.",
            "Ensure that the global events mock object is properly initialized.",
          ].join(" "),
        );
      }

      const listeners = globalMock.events[eventName];

      if (!listeners) {
        throw new Error(
          [
            "Event list not found.",
            `No event listener found for the event name "${eventName}".`,
          ].join(" "),
        );
      }

      const entityIdx = listeners.findIndex(
        mockEntity => mockEntity[0] === mockFn,
      );

      if (entityIdx === -1) {
        throw new Error(
          [
            "Mock function not found.",
            "The specified mock function is not registered in the event set.",
          ].join(" "),
        );
      }

      const entity = listeners[entityIdx]!;

      entity[1].abort();
      listeners.splice(entityIdx, 1);

      const idx = globalMock.mockFns.findIndex(fn => fn === mockFn);

      if (idx === -1) return;

      globalMock.mockFns.splice(idx, 1);
    },
    [globalMockReferenceKey, eventName, mockFn] as const,
  );
};

export const initNamespace = async (page: Page): Promise<void> => {
  await page.evaluate(gmrk => {
    const globalMock = window[gmrk as typeof globalMockReferenceKey];

    if (!globalMock) {
      throw new Error(
        [
          "Global mock object not found.",
          "Ensure that the global mock object is properly initialized.",
        ].join(" "),
      );
    }

    globalMock.events = {} as EventsMockState;
  }, globalMockReferenceKey);
};

export const setup = (): {
  attachMockedEvent: (
    locator: Locator,
    eventName: string,
    mockFn: MockFn,
  ) => Promise<void>;
  detachMockedEvent: (
    locator: Locator,
    eventName: string,
    mockFn: MockFn,
  ) => Promise<void>;
} => {
  return {
    attachMockedEvent,
    detachMockedEvent,
  };
};

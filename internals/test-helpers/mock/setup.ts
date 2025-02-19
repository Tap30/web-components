import type { Page } from "@playwright/test";
import { globalMockReferenceKey } from "./constants.ts";
import * as eventsMock from "./events-mock.ts";
import * as fnMock from "./fn-mock.ts";
import type { MockFn } from "./types.ts";

declare global {
  interface Window {
    [globalMockReferenceKey]?: {
      events?: eventsMock.EventsMockState;
      mockFns: MockFn[];
    };
  }
}

const attachGlobals = async (page: Page) => {
  await page.evaluate(gmrk => {
    window[gmrk as typeof globalMockReferenceKey] = { mockFns: [] };
  }, globalMockReferenceKey);

  await eventsMock.initNamespace(page);
};

const detachGlobals = (page: Page) => {
  return page.evaluate(gmrk => {
    delete window[gmrk as typeof globalMockReferenceKey];
  }, globalMockReferenceKey);
};

export const disposeMocks = (page: Page) => detachGlobals(page);

export const setupMocks = async (page: Page) => {
  await attachGlobals(page);

  return {
    events: eventsMock.setup(),
    createFakeFn: fnMock.setup(page),
  };
};

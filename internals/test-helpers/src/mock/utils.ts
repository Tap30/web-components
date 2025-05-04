import type { Page } from "@playwright/test";
import { globalMockReferenceKey } from "./constants.ts";
import type { EventsMockState } from "./events-mock.ts";
import type { MockFn } from "./types.ts";

export const evaluateGlobalMock = async (
  page: Page,
): Promise<{
  events?: EventsMockState;
  mockFns: MockFn[];
}> => {
  return page.evaluate(gmrk => {
    const globalMock = window[gmrk as typeof globalMockReferenceKey];

    if (!globalMock) {
      throw new Error(
        [
          "Global mock object not found.",
          "Ensure that the global mock object is properly initialized.",
        ].join(" "),
      );
    }

    return globalMock;
  }, globalMockReferenceKey);
};

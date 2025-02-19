import type { Page } from "@playwright/test";
import { globalMockReferenceKey } from "./constants.ts";

export const evaluateGlobalMock = async (page: Page) => {
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

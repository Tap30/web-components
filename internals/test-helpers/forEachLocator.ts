import { type Locator } from "@playwright/test";

export const forEachLocator = async (
  locators: Locator[],
  callback: (locator: Locator, index: number) => void | Promise<void>,
) => {
  for (const [index, locator] of locators.entries()) {
    await callback(locator, index);
  }
};

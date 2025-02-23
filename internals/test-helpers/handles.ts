import type { Page } from "@playwright/test";

export const windowHandle = (page: Page) => page.evaluateHandle(() => window);

export const documentHandle = (page: Page) =>
  page.evaluateHandle(() => document);

export const bodyHandle = (page: Page) =>
  page.evaluateHandle(() => document.body);

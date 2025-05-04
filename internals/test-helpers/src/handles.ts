import type { ElementHandle, JSHandle, Page } from "@playwright/test";

export const windowHandle = (
  page: Page,
): Promise<JSHandle<Window & typeof globalThis>> =>
  page.evaluateHandle(() => window);

export const documentHandle = (page: Page): Promise<ElementHandle<Document>> =>
  page.evaluateHandle(() => document);

export const bodyHandle = (page: Page): Promise<ElementHandle<HTMLElement>> =>
  page.evaluateHandle(() => document.body);

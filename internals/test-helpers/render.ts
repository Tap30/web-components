import type { ElementHandle, Locator, Page } from "@playwright/test";
import { bodyHandle } from "./handles.ts";

export const render = async (page: Page, content: string, root?: Locator) => {
  let handle: ElementHandle<HTMLElement | SVGElement | null> | null = null;

  if (!root) handle = await bodyHandle(page);
  else handle = await root.elementHandle();

  if (!handle) throw new Error("Invalid root.");

  await page.evaluate(
    ([element, content]) => {
      if (!element) {
        throw new Error(
          "Expected an element with the specified locator or handle to be found on the page.",
        );
      }

      element.innerHTML = content;
    },
    [handle, content] as const,
  );

  return handle.dispose();
};

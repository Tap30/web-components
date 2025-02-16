import { test, type Locator, type Page } from "@playwright/test";

export const render = (page: Page, content: string, root?: Locator) => {
  return page.evaluate(
    async ([root, content]) => {
      const targetRoot = (await root?.elementHandle()) ?? document.body;

      targetRoot.innerHTML = content;
    },
    [root, content] as const,
  );
};

const { afterAll, afterEach, beforeAll, beforeEach, describe, expect, step } =
  test;

export {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  step,
  test,
};

import { test as base } from "@playwright/test";

const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto("/test");
    await use(page);
  },
});

const { afterAll, afterEach, beforeAll, beforeEach, describe, expect, step } =
  test;

export { default as createPromiseResolvers } from "./create-promise-resolvers.ts";
export * from "./forEachLocator.ts";
export * from "./handles.ts";
export * from "./mock/index.ts";
export * from "./render.ts";

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

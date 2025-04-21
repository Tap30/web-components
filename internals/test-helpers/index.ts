import { AxeBuilder } from "@axe-core/playwright";
import { type Page, test as base } from "@playwright/test";

const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto("/test");
    await use(page);
  },
});

const { afterAll, afterEach, beforeAll, beforeEach, describe, expect, step } =
  test;

/**
 * Configures an accessibility check for a given Playwright `page` using AxeBuilder,
 * disabling specific rules that are not applicable when testing isolated UI components
 * rather than full web pages.
 *
 * Disabled rules:
 * - "landmark-one-main": Requires a main landmark on the page.
 * - "region": Requires all content to be contained within ARIA landmarks.
 * - "page-has-heading-one": Requires a level-one heading on the page or frame.
 *
 * These rules are intended for complete document structures and may be overly strict
 * when testing individual components.
 *
 * @param {Page} page - The Playwright page object representing the component or view to test.
 * @returns {AxeBuilder} - An AxeBuilder instance configured for the given page with specific rules disabled.
 *
 * @example
 * ```ts
 * const isAccessible = await checkAccessibility(page);
 * expect(isAccessible).toBe(true);
 * ```
 *
 * @see {@link http://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md | Axe-core rule descriptions}
 * @see {@link https://playwright.dev/docs/accessibility-testing | Playwright accessibility testing docs}
 */
const accessibility = (page: Page): AxeBuilder => {
  const rulesToDisable = [
    "landmark-one-main",
    "region",
    "page-has-heading-one",
  ];

  return new AxeBuilder({ page }).disableRules(rulesToDisable);
};

export { default as createPromiseResolvers } from "./create-promise-resolvers.ts";
export * from "./forEachLocator.ts";
export * from "./handles.ts";
export * from "./mock/index.ts";
export * from "./render.ts";

export {
  accessibility,
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  step,
  test,
};

import { test } from "@playwright/test";

const { afterAll, afterEach, beforeAll, beforeEach, describe, expect, step } =
  test;

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

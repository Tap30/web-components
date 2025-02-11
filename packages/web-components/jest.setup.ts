import { cleanup } from "@internals/test-helpers";
import { afterEach, beforeAll, jest } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";

beforeAll(async () => {
  await import("element-internals-polyfill");
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

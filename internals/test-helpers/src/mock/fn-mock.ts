import type { Page } from "@playwright/test";
import { expect } from "../index.ts";
import type { MockFn } from "./types.ts";
import { evaluateGlobalMock } from "./utils.ts";

const createResultMatcher =
  (page: Page, mockRef: MockFn) =>
  async (expectedResult: Partial<Omit<MockFn, "__id__">>): Promise<void> => {
    const globalMockRef = await evaluateGlobalMock(page);
    const mock = globalMockRef.mockFns.find(fn => fn.__id__ === mockRef.__id__);

    if (!mock) {
      throw new Error(
        `Expected valid mock fn. Received ${JSON.stringify(mockRef, null, 2)}`,
      );
    }

    expect(mock).toEqual(expect.objectContaining(expectedResult));
  };

let idCounter = 0;

const genId = () => idCounter++;

export const setup =
  (page: Page) =>
  (): {
    ref: MockFn;
    matchResult: (
      expectedResult: Partial<Omit<MockFn, "__id__">>,
    ) => Promise<void>;
  } => {
    const ref: MockFn = {
      called: false,
      callCount: 0,
      calls: [],
      __id__: genId(),
    };

    return { ref, matchResult: createResultMatcher(page, ref) };
  };

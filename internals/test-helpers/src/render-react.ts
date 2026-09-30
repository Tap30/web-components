import type { Page } from "@playwright/test";

/**
 * A React tree, described as plain data.
 *
 * `render` from `./render.ts` sets `innerHTML`, which is enough for web
 * components because they register themselves globally and upgrade on parse.
 * React components cannot work that way — they have to be mounted by React — so
 * a test cannot simply hand over a markup string.
 *
 * It cannot hand over JSX either: everything crossing `page.evaluate` is
 * serialised, and a React element is not serialisable. So a test describes the
 * tree as data, and the page turns it into elements. `type` is looked up in the
 * `@tapsioss/react-ui` barrel first, and falls back to a DOM tag name — which is
 * what lets a test nest a raw `<svg>` inside a `<Button>`.
 */
export type ReactNodeSpec =
  | string
  | number
  | boolean
  | null
  | undefined
  | ReactNodeSpec[]
  | {
      /** A `@tapsioss/react-ui` export (`"Button"`) or a DOM tag (`"svg"`). */
      type: string;
      props?: Record<string, unknown>;
      children?: ReactNodeSpec;
    };

/**
 * Mount a React tree into the test page and wait for it to commit.
 *
 * React 18 renders asynchronously, so this waits for the root to stop being
 * empty. Without that, a test that immediately presses Tab can run before
 * anything is focusable and fail for the wrong reason.
 */
export const renderReact = async (
  page: Page,
  spec: ReactNodeSpec,
): Promise<void> => {
  // Serialised to a string rather than handed over as an object. `ReactNodeSpec`
  // is recursive, and Playwright's `evaluate` maps its argument type deeply
  // enough that TypeScript gives up with "type instantiation is excessively
  // deep". The spec is JSON by construction, so a round-trip costs nothing.
  //
  // `__renderReact` is reached through a local cast rather than a
  // `declare global`: the test page declares the same property with its own
  // type, and two conflicting augmentations of `Window` resolve to an error.
  await page.evaluate(
    json => {
      const mount = (
        window as unknown as { __renderReact?: (spec: unknown) => void }
      ).__renderReact;

      if (!mount) {
        throw new Error(
          "`window.__renderReact` is missing. The page under test must be the " +
            "React playground's /test route.",
        );
      }

      mount(JSON.parse(json));
    },
    JSON.stringify(spec ?? null),
  );

  const isEmpty = spec === null || spec === undefined || spec === false;

  if (!isEmpty) {
    await page.waitForFunction(() => {
      const root = document.getElementById("root");

      return root !== null && root.childElementCount > 0;
    });
  }
};

/** Unmount everything. Use in `afterEach` so trees do not leak between tests. */
export const cleanupReact = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    (
      window as unknown as { __renderReact?: (spec: unknown) => void }
    ).__renderReact?.(null);
  });
};

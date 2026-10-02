import * as ReactUI from "@tapsioss/react-ui";
import { createElement, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";

// Target page for `@tapsioss/react-ui`'s Playwright suite, served at
// http://localhost:3001/test.
//
// It loads all four themes plus the primitives, and installs the page half of
// the render bridge described in `@internals/test-helpers/render-react`.
import "@tapsioss/theme/drive/dark.css";
import "@tapsioss/theme/drive/light.css";
import "@tapsioss/theme/ride/dark.css";
import "@tapsioss/theme/ride/light.css";
import "@tapsioss/theme/tokens.css";

type Spec =
  | string
  | number
  | boolean
  | null
  | undefined
  | Spec[]
  | { type: string; props?: Record<string, unknown>; children?: Spec };

declare global {
  interface Window {
    /** The page half of the render bridge in `@internals/test-helpers`. */
    __renderReact?: (spec: Spec) => void;
    /** Calls to each `callback(name)` prop since the last render. */
    __callbackCalls?: Record<string, number>;
  }
}

// The public barrel, so a test can name a component (`"Button"`). Icons are
// deliberately absent: react-ui's tests must not depend on
// `@tapsioss/react-icons`, so an adornment is always a raw DOM subtree.
const registry = ReactUI as unknown as Record<string, unknown>;

/**
 * Turn the serialised description a test sent into real React elements.
 *
 * `type` resolves against the `@tapsioss/react-ui` barrel first so a test can
 * say `"Button"`, and falls back to the string itself so it can also say
 * `"svg"` — which is how adornments get tested with real markup.
 */
const isSpecLike = (value: unknown): boolean =>
  Array.isArray(value)
    ? value.some(isSpecLike)
    : typeof value === "object" && value !== null && "type" in value;

/** `callback(name)` from `@internals/test-helpers`, as it arrives here. */
const isCallback = (value: unknown): value is { $callback: string } =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as { $callback?: unknown }).$callback === "string";

/** The real function a `callback(name)` prop becomes: it only counts calls. */
const recordCalls = (name: string) => () => {
  const calls = (window.__callbackCalls ??= {});

  calls[name] = (calls[name] ?? 0) + 1;
};

const build = (spec: Spec, key?: number): ReactNode => {
  if (Array.isArray(spec)) {
    return spec.map((child, index) => build(child, index));
  }

  if (spec === null || spec === undefined || typeof spec !== "object") {
    return spec as ReactNode;
  }

  const component = registry[spec.type] ?? spec.type;

  // Props can hold trees too — `leadingAdornment` and friends take a ReactNode,
  // and a test sends those as specs like everything else. Anything that looks
  // like a spec gets built; plain values pass through untouched.
  const props: Record<string, unknown> = {};

  for (const [name, value] of Object.entries(spec.props ?? {})) {
    props[name] = isCallback(value)
      ? recordCalls(value.$callback)
      : isSpecLike(value)
        ? build(value as Spec)
        : value;
  }

  // Index keys are fine here: these trees are static for the life of a test.
  if (key !== undefined) props["key"] = key;

  return createElement(
    component as Parameters<typeof createElement>[0],
    props,
    spec.children === undefined ? undefined : build(spec.children),
  );
};

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("There is no `#root` element.");

let root: Root | null = null;
let generation = 0;

/**
 * Each call mounts a FRESH tree.
 *
 * Rendering into the same root would let React reconcile — same component, same
 * position, so it updates props instead of remounting. Mount-only behaviour
 * like `autoFocus` would then silently not happen on the second render, which
 * is exactly what the autofocus test checks. Bumping a key on the wrapper makes
 * every call a real mount, matching the `innerHTML` replacement the web
 * component tests rely on.
 */
window.__renderReact = (spec: Spec) => {
  window.__callbackCalls = {};
  root ??= createRoot(rootElement);
  generation += 1;
  root.render(
    createElement(
      "div",
      { key: generation, style: { display: "contents" } },
      build(spec),
    ),
  );
};

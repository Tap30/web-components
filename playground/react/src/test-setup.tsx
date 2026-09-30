import * as ReactIcons from "@tapsioss/react-icons";
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
  }
}

// Both public barrels, so a test can name a component (`"Button"`) or a real
// icon (`"CircleCross"`). react-ui wins any name collision, since a test naming
// a component means the component.
const registry: Record<string, unknown> = {
  ...(ReactIcons as unknown as Record<string, unknown>),
  ...(ReactUI as unknown as Record<string, unknown>),
};

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
    props[name] = isSpecLike(value) ? build(value as Spec) : value;
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

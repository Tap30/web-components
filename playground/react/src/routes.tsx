import type { ReactNode } from "react";
import { ButtonPage } from "./pages/button.tsx";
import { PlaygroundPage } from "./pages/playground.tsx";

/**
 * Every example page, in one place.
 *
 * The table of contents and the navigation bar are both generated from this, so
 * adding a page is a single entry here — there is no second list to forget.
 */

export type ExamplePage = {
  /** Relative to the app root; the route path and the link target. */
  path: string;
  title: string;
  description: string;
  element: ReactNode;
};

export const PAGES: ExamplePage[] = [
  {
    path: "button",
    title: "Button",
    description:
      "Every variant × hierarchy pair, the three sizes, adornments, full width, overflow, and the disabled and loading states.",
    element: <ButtonPage />,
  },
  {
    path: "playground",
    title: "Playground",
    description:
      "Deliberately empty. Scratch space for trying components together — edit src/pages/playground.tsx and throw the changes away afterwards.",
    element: <PlaygroundPage />,
  },
];

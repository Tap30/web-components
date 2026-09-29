// Target page for `@tapsioss/react-ui`'s Playwright suite, served at
// http://localhost:3001/test.
//
// SCAFFOLD: react-ui has no tests yet. This page exists so that
// `packages/react-ui/playwright.config.ts` points at something real, and so the
// React playground mirrors the Lit one. It loads all four themes plus the
// primitives, then leaves an empty `#root` for a test to render into.
//
// The Lit suite injects raw HTML into <body> because web components register
// themselves globally. React components cannot work that way, so when the first
// react-ui test is written this file will need a render bridge — most likely a
// `window.__render(element)` helper that a test calls through `page.evaluate`.
// That shape should be decided alongside the first real test, not guessed here.
import "@tapsioss/theme/drive/dark.css";
import "@tapsioss/theme/drive/light.css";
import "@tapsioss/theme/ride/dark.css";
import "@tapsioss/theme/ride/light.css";
import "@tapsioss/theme/tokens.css";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("There is no `#root` element.");

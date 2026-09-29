// Entry point for `@tapsioss/web-components`' Playwright suite, which serves
// this page at http://localhost:3000/test and injects markup into <body>.
//
// The legacy token set is what these components are styled against — see
// src/index.ts. The tests themselves are behavioural (focus, events, a11y) with
// no visual snapshots, so they pass either way, but loading it keeps the page
// looking like the real thing when a test is debugged with `--headed`.
import "@tapsioss/theme/css-variables";

import { registerAll } from "@tapsioss/web-components";

registerAll();

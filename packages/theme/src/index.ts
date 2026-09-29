// Token sets are imported by subpath so a consumer pulls in only what it uses,
// and so adding a product or theme never changes this barrel:
//
//   import "@tapsioss/theme/tokens.css";       // primitives — import once
//   import "@tapsioss/theme/ride/light.css";   // one theme on top
//
//   import { tokens } from "@tapsioss/theme/ride/light";
//
// This entry point carries only the shared value-shape types.

export type * from "./types.ts";

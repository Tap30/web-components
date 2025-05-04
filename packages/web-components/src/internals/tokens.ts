import { unsafeCSS, type CSSResult } from "lit";

export const Z_INDEXES = {
  0: 1000,
  1: 1010,
  2: 1020,
  3: 1030,
  4: 1040,
  5: 1050,
};

export const FOCUS_RING_LINE: CSSResult = unsafeCSS(
  "var(--tapsi-stroke-2) solid var(--tapsi-color-content-accent)",
);
export const FOCUS_RING_OFFSET: CSSResult = unsafeCSS("var(--tapsi-stroke-2)");

import { customElement } from "lit/decorators.js";
import styles from "./badge-wrapper.style.ts";
import { BadgeWrapper } from "./badge-wrapper.ts";

export { Slots } from "./constants.ts";

/**
 * @summary A wrapper component to position a badge relative to an anchor.
 *
 * @tag tapsi-badge-wrapper
 *
 * @prop {"rectangle" | "circle" | "pill"} [anchor-shape="rectangle"] - The shape of the anchor.
 * @prop {"left" | "right"} [badge-side="right"] - The horizontal placement of the badge.
 * @prop {"top" | "middle"} [badge-alignment="top"] - The vertical alignment of the badge.
 *
 * @slot - The default slot for the anchor element.
 * @slot badge - The slot for the badge to be positioned.
 */
@customElement("tapsi-badge-wrapper")
export class TapsiBadgeWrapper extends BadgeWrapper {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-badge-wrapper": TapsiBadgeWrapper;
  }
}

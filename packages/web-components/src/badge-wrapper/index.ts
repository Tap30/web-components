import { customElement } from "lit/decorators.js";
import { BadgeWrapper } from "./badge-wrapper";
import styles from "./badge-wrapper.style";

export { Slots } from "./constants";

/**
 * @summary A wrapper component to position a badge relative to an anchor.
 *
 * @prop {"rectangular" | "circular"} [anchor-shape="rectangular"] - The shape of the anchor.
 * @prop {"left" | "right"} [badge-side="right"] - The horizontal placement of the badge.
 * @prop {"top" | "middle"} [badge-alignment="alignment"] - The vertical alignment of the badge.
 *
 * @slot - The default slot for the anchor element.
 * @slot badge - The slot for the badge to be positioned.
 */
@customElement("tap-badge-wrapper")
export class TapBadgeWrapper extends BadgeWrapper {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-badge-wrapper": TapBadgeWrapper;
  }
}

import { customElement } from "lit/decorators.js";
import { Chip } from "./chip";
import styles from "./chip.style";

export { Slots } from "./constants";

/**
 * @summary The chip component.
 *
 * @slot - Default content slot for chip text.
 * @slot [leading-icon] - The slot for an optional leading icon.
 * @slot [trailing-icon] - The slot for an optional trailing icon.
 *
 * @prop {boolean} [disabled=false] - Whether the chip is disabled or not.
 * @prop {boolean} [selected=false] - Whether the chip is selected or not.
 * @prop {boolean} [full-width=false] - Indicates if the chip should be full width.
 * @prop {"small" | "medium"} [size='medium'] - The size of the chip.
 */

@customElement("tap-chip")
export class TapChip extends Chip {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-chip": TapChip;
  }
}

import { customElement } from "lit/decorators.js";
import { Chip } from "./chip";
import styles from "./chip.style";

export * from "./events";

export { Slots } from "./constants";

/**
 * @summary The chip component.
 *
 * @tag tap-chip
 *
 * @slot - Default content slot for chip text.
 * @slot [leading-icon] - The slot for an optional leading icon.
 * @slot [trailing-icon] - The slot for an optional trailing icon.
 *
 * @prop {boolean} [disabled=false] - Whether the chip is disabled or not.
 * @prop {boolean} [selected=false] - Whether the chip is selected or not.
 * @prop {"sm" | "md"} [size='md'] - The size of the chip.
 * @prop {string} [value] - The value associated with the chip.\
 * Use it when chips are children of chip-group. This value has to be unique among sibling chips.
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

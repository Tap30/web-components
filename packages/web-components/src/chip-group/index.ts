import { customElement } from "lit/decorators.js";
import { ChipGroup } from "./chip-group";
import styles from "./chip-group.style";

export { Slots } from "./constants";
export * from "./events";

/**
 * @summary A chip group component.
 *
 * @tag tap-chip-group
 *
 * @slot - The default slot for chips.
 *
 * @fires {SelectChangeEvent} selectchange - Fired when the chip selection state changes. (cancelable, bubbles).
 *
 * @prop {'single' | 'multiple'} [select-mode='single'] - The select mode of the chip group.
 * @prop {'horizontal' | 'vertical'} [orientation='horizontal'] - The orientation of the chip group.
 * @prop {boolean} [full-width=false] - Indicates if the chip should be full width.
 * @prop {string} [label=""] -
 * Defines a string value that can be used to set a label
 * for assistive technologies.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 */

@customElement("tap-chip-group")
export class TapChipGroup extends ChipGroup {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-chip-group": TapChipGroup;
  }
}

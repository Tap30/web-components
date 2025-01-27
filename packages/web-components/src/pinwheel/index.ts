import { customElement } from "lit/decorators.js";
import { PinwheelItem } from "./item/index.ts";
import itemStyles from "./item/item.style.ts";
import styles from "./pinwheel.style.ts";
import { Pinwheel } from "./pinwheel.ts";

export { Slots } from "./constants.ts";

/**
 * @summary The pinwheel item component.
 *
 * @tag tapsi-pinwheel-item
 *
 * @prop {boolean} [selected=false] - Indicates whether the item is selected or not.
 * @prop {string} [value=""] -
 * The value associated with the item.
 * This value has to be unique among sibling items.
 */
@customElement("tapsi-pinwheel-item")
export class TapsiPinwheelItem extends PinwheelItem {
  public static override readonly styles = [itemStyles];
}

/**
 * @summary The pinwheel component.
 *
 * @tag tapsi-pinwheel
 *
 * @prop {string} [valuemin=""] -
 * Defines the minimum allowed value for pinwheel.
 * Use it when your items' values are sequential numbers.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuemin
 * @prop {string} [valuemax=""] -
 * Defines the maximum allowed value for pinwheel.
 * Use it when your items' values are sequential numbers.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuemax
 * @prop {string} [label=""] -
 * Defines a string value that can be used to set a label
 * for assistive technologies.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 * @prop {string} [labelledby=""] -
 * Identifies the element (or elements) that labels the pinwheel.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
 *
 * @fires {Event} change - Fires when the pinwheel selected state changes (bubbles).
 */
@customElement("tapsi-pinwheel")
export class TapsiPinwheel extends Pinwheel {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-pinwheel": TapsiPinwheel;
    "tapsi-pinwheel-item": TapsiPinwheelItem;
  }
}

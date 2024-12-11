import { customElement } from "lit/decorators.js";
import { PinwheelItem } from "./item";
import itemStyles from "./item/item.style";
import { Pinwheel } from "./pinwheel";
import styles from "./pinwheel.style";

/**
 * @summary The pinwheel item component.
 *
 * @tag tap-pinwheel-item
 *
 * @prop {boolean} [selected=false] - Indicates whether the item is selected or not.
 * @prop {string} [value=""] -
 * The value associated with the item.
 * This value has to be unique among sibling items.
 */
@customElement("tap-pinwheel-item")
export class TapPinwheelItem extends PinwheelItem {
  public static override readonly styles = [itemStyles];
}

/**
 * @summary The pinwheel component.
 *
 * @tag tap-pinwheel
 *
 * @fires change - Fires when the pinwheel selected state changes.
 */
@customElement("tap-pinwheel")
export class TapPinwheel extends Pinwheel {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-pinwheel": TapPinwheel;
    "tap-pinwheel-item": TapPinwheelItem;
  }
}

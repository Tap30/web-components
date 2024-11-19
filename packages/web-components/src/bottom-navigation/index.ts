import { customElement } from "lit/decorators.js";
import { BottomNavigation } from "./bottom-navigation";
import bottomNavigationStyles from "./bottom-navigation.style";
import {
  ActivateEvent,
  BottomNavigationItem,
  DeactivateEvent,
  Slots as ItemSlots,
} from "./item";
import itemStyles from "./item/item.style";

export { Slots } from "./constants";
export { ActivateEvent, DeactivateEvent, ItemSlots };

/**
 * @summary Represents a single item in a bottom navigation bar.
 *
 * @tag tap-bottom-navigation-item
 *
 * @slot icon - The slot for the icon element.
 * @slot - The default slot for the content/label.
 *
 * @fires {ActivateEvent} activate
 * @fires {DeactivateEvent} deactivate
 *
 * @prop {boolean} [active=false] - Indicates whether the navigation item is active or not.
 * @prop {string} value - The value associated with the item. This value has to be unique among sibling items.
 */
@customElement("tap-bottom-navigation-item")
export class TapBottomNavigationItem extends BottomNavigationItem {
  public static override readonly styles = [itemStyles];
}

/**
 * @summary The bottom navigation bar that contains multiple navigation items.
 *
 * @tag tap-bottom-navigation
 *
 * @slot - The default slot for navigation items.
 *
 * @prop {string} [screen-reader-label] - The label used for screen readers.
 */
@customElement("tap-bottom-navigation")
export class TapBottomNavigation extends BottomNavigation {
  public static override readonly styles = [bottomNavigationStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-bottom-navigation": TapBottomNavigation;
    "tap-bottom-navigation-item": TapBottomNavigationItem;
  }
}

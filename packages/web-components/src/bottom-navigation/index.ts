import { customElement } from "lit/decorators.js";
import { BottomNavigation } from "./bottom-navigation";
import bottomNavigationStyles from "./bottom-navigation.style";
import { BottomNavigationItem, Slots as ItemSlots } from "./item";
import itemStyles from "./item/item.style";

export { Slots } from "./constants";
export * from "./events";
export { ItemSlots };

/**
 * @summary Represents a single item in a bottom navigation bar.
 *
 * @tag tapsi-bottom-navigation-item
 *
 * @slot icon - The slot for the icon element.
 * @slot - The default slot for the content/label.
 *
 * @fires {ActivateEvent} activate - Fired when the item activates (bubbles).
 * @fires {DeactivateEvent} deactivate - Fired when the item deactivates (bubbles).
 *
 * @prop {boolean} [active=false] - Indicates whether the item is active or not.
 * @prop {string} [value=""] - The value associated with the item. This value has to be unique among sibling items.
 */
@customElement("tapsi-bottom-navigation-item")
export class TapsiBottomNavigationItem extends BottomNavigationItem {
  public static override readonly styles = [itemStyles];
}

/**
 * @summary The bottom navigation bar component.
 *
 * @tag tapsi-bottom-navigation
 *
 * @slot - The default slot for navigation items.
 *
 * @fires {ActiveChangeEvent} activechange - Fired when the items activation state changes (cancelable, bubbles).
 *
 * @prop {string} [label] -
 * Defines a string value that can be used to set a label
 * for assistive technologies.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 *
 * @member {string} activeItem
 * @description - The value of the currently activated item.
 */
@customElement("tapsi-bottom-navigation")
export class TapsiBottomNavigation extends BottomNavigation {
  public static override readonly styles = [bottomNavigationStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tapsi-bottom-navigation": TapsiBottomNavigation;
    "tapsi-bottom-navigation-item": TapsiBottomNavigationItem;
  }
}

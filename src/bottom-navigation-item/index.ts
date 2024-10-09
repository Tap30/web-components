import { customElement } from "lit/decorators.js";
import { BottomNavigationItem } from "./bottom-navigation-item.js";
import styles from "./bottom-navigation-item.style.js";

/**
 * @summary Represents a single item in a bottom navigation bar.
 *
 * @slot [icon] - Slot for the icon when the item is inactive.
 * @slot [active-icon] - Slot for the icon when the item is active.
 * @slot - The default slot for the item label or content.
 *
 * @prop {boolean} [active=false] - Indicates whether the navigation item is active.
 *
 * @csspart [bottom-navigation-item] - The main container for the bottom navigation item.
 *
 * @cssprop [--tap-font-family=--tap-sys-font-family] - The font family for the navigation item.
 * @cssprop [--tap-bottom-navigation-item-color=--tap-sys-color-content-tertiary] - The text color when the item is inactive.
 * @cssprop [--tap-bottom-navigation-active-color=--tap-sys-color-content-primary] - The text color when the item is active.
 * @cssprop [--tap-bottom-navigation-item-line-height=--tap-sys-typography-label-xs-height] - The line height for the label.
 * @cssprop [--tap-bottom-navigation-item-font-size=--tap-sys-typography-label-xs-size] - The font size for the label.
 * @cssprop [--tap-bottom-navigation-item-font-weight=--tap-sys-typography-label-xs-weight] - The font weight for the label.
 */
@customElement("tap-bottom-navigation-item")
export class TapBottomNavigationItem extends BottomNavigationItem {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-bottom-navigation-item": TapBottomNavigationItem;
  }
}

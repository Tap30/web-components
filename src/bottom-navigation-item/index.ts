import { customElement } from 'lit/decorators.js';
import { BottomNavigationItem } from './bottom-navigation-item.js';
import styles from './bottom-navigation-item.style.js';

/**
 * ### Example
 *
 *
 * ##### Simple
 *
 * ```html
 * <tap-bottom-navigation-item></tap-bottom-navigation-item>
 * ```
 *
 * ##### Active State
 *
 * ```html
 * <tap-bottom-navigation-item active></tap-bottom-navigation-item>
 * ```
 *
 * @summary Represents a single item in a bottom navigation bar.
 *
 * @slot `icon` - Slot for the icon when the item is inactive.
 * @slot `active-icon` - Slot for the icon when the item is active.
 * @slot - The default slot for the item label or content.
 *
 * @prop {boolean} active - Indicates whether the navigation item is active.
 *
 * @csspart bottom-navigation-item - The main container for the bottom navigation item.
 *
 * @cssprop `--tap-sys-font-family` - The font family for the navigation item.
 * @cssprop `--tap-sys-color-content-tertiary` - The text color when the item is inactive.
 * @cssprop `--tap-sys-color-content-primary` - The text color when the item is active.
 * @cssprop `--tap-sys-typography-label-xs-height` - The line height for the label.
 * @cssprop `--tap-sys-typography-label-xs-size` - The font size for the label.
 * @cssprop `--tap-sys-typography-label-xs-weight` - The font weight for the label.
 */
@customElement('tap-bottom-navigation-item')
export class TapBottomNavigationItem extends BottomNavigationItem {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-bottom-navigation-item': TapBottomNavigationItem;
  }
}

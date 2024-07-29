import { customElement } from 'lit/decorators.js';
import { BottomNavigation } from './bottom-navigation.js';
import styles from './bottom-navigation.style.js';

/**
 * @summary A bottom navigation bar that contains multiple navigation items.
 *
 * @slot - The default slot for adding `tap-bottom-navigation-item` elements.
 *
 * @csspart [bottom-navigation] - The main container for the bottom navigation bar.
 *
 * @cssprop [--tap-bottom-navigation-background=--tap-sys-color-surface-secondary] - The background color of the navigation bar.
 * @cssprop [--tap-bottom-navigation-border-top-width=--tap-sys-stroke-1] - The width of the top border of the navigation bar.
 * @cssprop [--tap-bottom-navigation-border-top-color=--tap-sys-color-border-primary] - The color of the top border of the navigation bar.
 */
@customElement('tap-bottom-navigation')
export class TapBottomNavigation extends BottomNavigation {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-bottom-navigation': TapBottomNavigation;
  }
}

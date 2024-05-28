import { customElement } from 'lit/decorators.js';
import { BottomNavigation } from './bottom-navigation.js';
import styles from './bottom-navigation.style.js';

@customElement('tap-bottom-navigation')
export class TapBottomNavigation extends BottomNavigation {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-bottom-navigation': TapBottomNavigation;
  }
}

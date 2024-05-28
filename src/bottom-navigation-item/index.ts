import { customElement } from 'lit/decorators.js';
import { BottomNavigationItem } from './bottom-navigation-item.js';
import styles from './bottom-navigation-item.style.js';

@customElement('tap-bottom-navigation-item')
export class TapBottomNavigationItem extends BottomNavigationItem {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-bottom-navigation-item': TapBottomNavigationItem;
  }
}

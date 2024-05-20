import { customElement } from 'lit/decorators.js';
import { Banner } from './banner.js';
import styles from './banner.style.js';

@customElement('tap-banner')
export class TapBanner extends Banner {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'tap-banner': TapBanner;
  }
}

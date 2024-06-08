import { customElement } from 'lit/decorators.js';
import { HeartIcon } from './heart';

@customElement('tap-icon-heart')
export class TapIconHeart extends HeartIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-heart': TapIconHeart;
  }
}

import { customElement } from 'lit/decorators.js';
import { HomeFillIcon } from './home-fill';

@customElement('tap-icon-home-fill')
export class TapIconHomeFill extends HomeFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-home-fill': TapIconHomeFill;
  }
}

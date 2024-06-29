import { customElement } from 'lit/decorators.js';
import { SunFillIcon } from './sun-fill';

@customElement('tap-icon-sun-fill')
export class TapIconSunFill extends SunFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-sun-fill': TapIconSunFill;
  }
}

import { customElement } from 'lit/decorators.js';
import { SunIcon } from './sun';

@customElement('tap-icon-sun')
export class TapIconSun extends SunIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-sun': TapIconSun;
  }
}

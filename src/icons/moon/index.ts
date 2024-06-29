import { customElement } from 'lit/decorators.js';
import { MoonIcon } from './moon';

@customElement('tap-icon-moon')
export class TapIconMoon extends MoonIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-moon': TapIconMoon;
  }
}

import { customElement } from 'lit/decorators.js';
import { MoonFillIcon } from './moon-fill';

@customElement('tap-icon-moon-fill')
export class TapIconMoonFill extends MoonFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-moon-fill': TapIconMoonFill;
  }
}

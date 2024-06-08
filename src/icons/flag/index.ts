import { customElement } from 'lit/decorators.js';
import { FlagIcon } from './flag';

@customElement('tap-icon-flag')
export class TapIconFlag extends FlagIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-flag': TapIconFlag;
  }
}

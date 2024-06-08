import { customElement } from 'lit/decorators.js';
import { FlagFillIcon } from './flag-fill';

@customElement('tap-icon-flag-fill')
export class TapIconFlagFill extends FlagFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-flag-fill': TapIconFlagFill;
  }
}

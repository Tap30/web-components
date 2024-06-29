import { customElement } from 'lit/decorators.js';
import { CheckFillIcon } from './check-fill';

@customElement('tap-icon-check-fill')
export class TapIconCheckFill extends CheckFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-check-fill': TapIconCheckFill;
  }
}

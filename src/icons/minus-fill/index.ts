import { customElement } from 'lit/decorators.js';
import { MinusFillIcon } from './minus-fill';

@customElement('tap-icon-minus-fill')
export class TapIconMinusFill extends MinusFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-minus-fill': TapIconMinusFill;
  }
}

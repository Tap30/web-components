import { customElement } from 'lit/decorators.js';
import { PersonMinusFillIcon } from './person-minus-fill';

@customElement('tap-icon-person-minus-fill')
export class TapIconPersonMinusFill extends PersonMinusFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-person-minus-fill': TapIconPersonMinusFill;
  }
}

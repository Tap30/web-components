import { customElement } from 'lit/decorators.js';
import { PersonMinusIcon } from './person-minus';

@customElement('tap-icon-person-minus')
export class TapIconPersonMinus extends PersonMinusIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-person-minus': TapIconPersonMinus;
  }
}

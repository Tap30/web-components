import { customElement } from 'lit/decorators.js';
import { PersonPlusFillIcon } from './person-plus-fill';

@customElement('tap-icon-person-plus-fill')
export class TapIconPersonPlusFill extends PersonPlusFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-person-plus-fill': TapIconPersonPlusFill;
  }
}

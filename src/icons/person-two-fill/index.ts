import { customElement } from 'lit/decorators.js';
import { PersonTwoFillIcon } from './person-two-fill';

@customElement('tap-icon-person-two-fill')
export class TapIconPersonTwoFill extends PersonTwoFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-person-two-fill': TapIconPersonTwoFill;
  }
}

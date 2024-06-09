import { customElement } from 'lit/decorators.js';
import { PersonTwoIcon } from './person-two';

@customElement('tap-icon-person-two')
export class TapIconPersonTwo extends PersonTwoIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-person-two': TapIconPersonTwo;
  }
}

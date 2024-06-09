import { customElement } from 'lit/decorators.js';
import { PersonFillIcon } from './person-fill';

@customElement('tap-icon-person-fill')
export class TapIconPersonFill extends PersonFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-person-fill': TapIconPersonFill;
  }
}

import { customElement } from 'lit/decorators.js';
import { SquarePersonIcon } from './square-person';

@customElement('tap-icon-square-person')
export class TapIconSquarePerson extends SquarePersonIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-square-person': TapIconSquarePerson;
  }
}

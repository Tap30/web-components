import { customElement } from 'lit/decorators.js';
import { PersonIcon } from './person';

@customElement('tap-icon-person')
export class TapIconPerson extends PersonIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-person': TapIconPerson;
  }
}

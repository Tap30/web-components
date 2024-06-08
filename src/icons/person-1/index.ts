import { customElement } from 'lit/decorators.js';
import { Person1Icon } from './person-1';

@customElement('tap-icon-person-1')
export class TapIconPerson1 extends Person1Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-person-1': TapIconPerson1;
  }
}

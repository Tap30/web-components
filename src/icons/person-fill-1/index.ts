import { customElement } from 'lit/decorators.js';
import { PersonFill1Icon } from './person-fill-1';

@customElement('tap-icon-person-fill-1')
export class TapIconPersonFill1 extends PersonFill1Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-person-fill-1': TapIconPersonFill1;
  }
}

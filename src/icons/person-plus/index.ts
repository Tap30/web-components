import { customElement } from 'lit/decorators.js';
import { PersonPlusIcon } from './person-plus';

@customElement('tap-icon-person-plus')
export class TapIconPersonPlus extends PersonPlusIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-person-plus': TapIconPersonPlus;
  }
}

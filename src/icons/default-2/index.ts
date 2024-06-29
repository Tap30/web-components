import { customElement } from 'lit/decorators.js';
import { Default2Icon } from './default-2';

@customElement('tap-icon-default-2')
export class TapIconDefault2 extends Default2Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-default-2': TapIconDefault2;
  }
}

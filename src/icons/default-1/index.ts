import { customElement } from 'lit/decorators.js';
import { Default1Icon } from './default-1';

@customElement('tap-icon-default-1')
export class TapIconDefault1 extends Default1Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-default-1': TapIconDefault1;
  }
}

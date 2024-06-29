import { customElement } from 'lit/decorators.js';
import { Medal1Icon } from './medal-1';

@customElement('tap-icon-medal-1')
export class TapIconMedal1 extends Medal1Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-medal-1': TapIconMedal1;
  }
}

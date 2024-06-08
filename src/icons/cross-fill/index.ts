import { customElement } from 'lit/decorators.js';
import { CrossFillIcon } from './cross-fill';

@customElement('tap-icon-cross-fill')
export class TapIconCrossFill extends CrossFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-cross-fill': TapIconCrossFill;
  }
}

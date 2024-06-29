import { customElement } from 'lit/decorators.js';
import { CrossIcon } from './cross';

@customElement('tap-icon-cross')
export class TapIconCross extends CrossIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-cross': TapIconCross;
  }
}

import { customElement } from 'lit/decorators.js';
import { PinCrossIcon } from './pin-cross';

@customElement('tap-icon-pin-cross')
export class TapIconPinCross extends PinCrossIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-pin-cross': TapIconPinCross;
  }
}

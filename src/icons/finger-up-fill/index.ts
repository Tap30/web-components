import { customElement } from 'lit/decorators.js';
import { FingerUpFillIcon } from './finger-up-fill';

@customElement('tap-icon-finger-up-fill')
export class TapIconFingerUpFill extends FingerUpFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-finger-up-fill': TapIconFingerUpFill;
  }
}

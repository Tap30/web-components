import { customElement } from 'lit/decorators.js';
import { FingerLeftFillIcon } from './finger-left-fill';

@customElement('tap-icon-finger-left-fill')
export class TapIconFingerLeftFill extends FingerLeftFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-finger-left-fill': TapIconFingerLeftFill;
  }
}

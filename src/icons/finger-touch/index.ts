import { customElement } from 'lit/decorators.js';
import { FingerTouchIcon } from './finger-touch';

@customElement('tap-icon-finger-touch')
export class TapIconFingerTouch extends FingerTouchIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-finger-touch': TapIconFingerTouch;
  }
}

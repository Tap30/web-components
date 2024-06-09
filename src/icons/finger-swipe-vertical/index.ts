import { customElement } from 'lit/decorators.js';
import { FingerSwipeVerticalIcon } from './finger-swipe-vertical';

@customElement('tap-icon-finger-swipe-vertical')
export class TapIconFingerSwipeVertical extends FingerSwipeVerticalIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-finger-swipe-vertical': TapIconFingerSwipeVertical;
  }
}

import { customElement } from 'lit/decorators.js';
import { LockSmallFillIcon } from './lock-small-fill';

@customElement('tap-icon-lock-small-fill')
export class TapIconLockSmallFill extends LockSmallFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-lock-small-fill': TapIconLockSmallFill;
  }
}

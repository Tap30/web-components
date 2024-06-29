import { customElement } from 'lit/decorators.js';
import { LockFillIcon } from './lock-fill';

@customElement('tap-icon-lock-fill')
export class TapIconLockFill extends LockFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-lock-fill': TapIconLockFill;
  }
}

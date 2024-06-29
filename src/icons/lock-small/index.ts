import { customElement } from 'lit/decorators.js';
import { LockSmallIcon } from './lock-small';

@customElement('tap-icon-lock-small')
export class TapIconLockSmall extends LockSmallIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-lock-small': TapIconLockSmall;
  }
}

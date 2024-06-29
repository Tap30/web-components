import { customElement } from 'lit/decorators.js';
import { LockIcon } from './lock';

@customElement('tap-icon-lock')
export class TapIconLock extends LockIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-lock': TapIconLock;
  }
}

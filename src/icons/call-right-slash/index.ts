import { customElement } from 'lit/decorators.js';
import { CallRightSlashIcon } from './call-right-slash';

@customElement('tap-icon-call-right-slash')
export class TapIconCallRightSlash extends CallRightSlashIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-call-right-slash': TapIconCallRightSlash;
  }
}

import { customElement } from 'lit/decorators.js';
import { CallLeftSlashIcon } from './call-left-slash';

@customElement('tap-icon-call-left-slash')
export class TapIconCallLeftSlash extends CallLeftSlashIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-call-left-slash': TapIconCallLeftSlash;
  }
}

import { customElement } from 'lit/decorators.js';
import { EarSlashIcon } from './ear-slash';

@customElement('tap-icon-ear-slash')
export class TapIconEarSlash extends EarSlashIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-ear-slash': TapIconEarSlash;
  }
}

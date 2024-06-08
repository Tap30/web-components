import { customElement } from 'lit/decorators.js';
import { TargetSlashIcon } from './target-slash';

@customElement('tap-icon-target-slash')
export class TapIconTargetSlash extends TargetSlashIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-target-slash': TapIconTargetSlash;
  }
}

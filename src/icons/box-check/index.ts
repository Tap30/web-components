import { customElement } from 'lit/decorators.js';
import { BoxCheckIcon } from './box-check';

@customElement('tap-icon-box-check')
export class TapIconBoxCheck extends BoxCheckIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-box-check': TapIconBoxCheck;
  }
}

import { customElement } from 'lit/decorators.js';
import { DoubleCheckIcon } from './double-check';

@customElement('tap-icon-double-check')
export class TapIconDoubleCheck extends DoubleCheckIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-double-check': TapIconDoubleCheck;
  }
}

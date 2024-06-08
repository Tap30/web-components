import { customElement } from 'lit/decorators.js';
import { CheckIcon } from './check';

@customElement('tap-icon-check')
export class TapIconCheck extends CheckIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-check': TapIconCheck;
  }
}

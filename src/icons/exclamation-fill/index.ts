import { customElement } from 'lit/decorators.js';
import { ExclamationFillIcon } from './exclamation-fill';

@customElement('tap-icon-exclamation-fill')
export class TapIconExclamationFill extends ExclamationFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-exclamation-fill': TapIconExclamationFill;
  }
}

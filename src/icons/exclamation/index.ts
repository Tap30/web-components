import { customElement } from 'lit/decorators.js';
import { ExclamationIcon } from './exclamation';

@customElement('tap-icon-exclamation')
export class TapIconExclamation extends ExclamationIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-exclamation': TapIconExclamation;
  }
}

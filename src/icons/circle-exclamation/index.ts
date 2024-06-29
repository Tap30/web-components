import { customElement } from 'lit/decorators.js';
import { CircleExclamationIcon } from './circle-exclamation';

@customElement('tap-icon-circle-exclamation')
export class TapIconCircleExclamation extends CircleExclamationIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-exclamation': TapIconCircleExclamation;
  }
}

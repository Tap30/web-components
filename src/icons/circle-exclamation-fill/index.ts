import { customElement } from 'lit/decorators.js';
import { CircleExclamationFillIcon } from './circle-exclamation-fill';

@customElement('tap-icon-circle-exclamation-fill')
export class TapIconCircleExclamationFill extends CircleExclamationFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-exclamation-fill': TapIconCircleExclamationFill;
  }
}

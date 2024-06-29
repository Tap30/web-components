import { customElement } from 'lit/decorators.js';
import { CircleCheckIcon } from './circle-check';

@customElement('tap-icon-circle-check')
export class TapIconCircleCheck extends CircleCheckIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-check': TapIconCircleCheck;
  }
}

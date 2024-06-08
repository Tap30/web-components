import { customElement } from 'lit/decorators.js';
import { CircleThunderIcon } from './circle-thunder';

@customElement('tap-icon-circle-thunder')
export class TapIconCircleThunder extends CircleThunderIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-thunder': TapIconCircleThunder;
  }
}

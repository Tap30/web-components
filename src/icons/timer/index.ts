import { customElement } from 'lit/decorators.js';
import { TimerIcon } from './timer';

@customElement('tap-icon-timer')
export class TapIconTimer extends TimerIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-timer': TapIconTimer;
  }
}

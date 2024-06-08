import { customElement } from 'lit/decorators.js';
import { CardTimeFillIcon } from './card-time-fill';

@customElement('tap-icon-card-time-fill')
export class TapIconCardTimeFill extends CardTimeFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-card-time-fill': TapIconCardTimeFill;
  }
}

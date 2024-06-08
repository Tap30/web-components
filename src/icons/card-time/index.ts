import { customElement } from 'lit/decorators.js';
import { CardTimeIcon } from './card-time';

@customElement('tap-icon-card-time')
export class TapIconCardTime extends CardTimeIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-card-time': TapIconCardTime;
  }
}

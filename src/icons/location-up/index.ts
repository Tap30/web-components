import { customElement } from 'lit/decorators.js';
import { LocationUpIcon } from './location-up';

@customElement('tap-icon-location-up')
export class TapIconLocationUp extends LocationUpIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-location-up': TapIconLocationUp;
  }
}

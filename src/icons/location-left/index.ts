import { customElement } from 'lit/decorators.js';
import { LocationLeftIcon } from './location-left';

@customElement('tap-icon-location-left')
export class TapIconLocationLeft extends LocationLeftIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-location-left': TapIconLocationLeft;
  }
}

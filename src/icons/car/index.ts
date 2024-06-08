import { customElement } from 'lit/decorators.js';
import { CarIcon } from './car';

@customElement('tap-icon-car')
export class TapIconCar extends CarIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-car': TapIconCar;
  }
}

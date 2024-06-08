import { customElement } from 'lit/decorators.js';
import { CarFillIcon } from './car-fill';

@customElement('tap-icon-car-fill')
export class TapIconCarFill extends CarFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-car-fill': TapIconCarFill;
  }
}

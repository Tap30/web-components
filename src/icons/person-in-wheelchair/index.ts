import { customElement } from 'lit/decorators.js';
import { PersonInWheelchairIcon } from './person-in-wheelchair';

@customElement('tap-icon-person-in-wheelchair')
export class TapIconPersonInWheelchair extends PersonInWheelchairIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-person-in-wheelchair': TapIconPersonInWheelchair;
  }
}

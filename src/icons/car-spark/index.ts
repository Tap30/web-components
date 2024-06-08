import { customElement } from 'lit/decorators.js';
import { CarSparkIcon } from './car-spark';

@customElement('tap-icon-car-spark')
export class TapIconCarSpark extends CarSparkIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-car-spark': TapIconCarSpark;
  }
}

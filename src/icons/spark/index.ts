import { customElement } from 'lit/decorators.js';
import { SparkIcon } from './spark';

@customElement('tap-icon-spark')
export class TapIconSpark extends SparkIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-spark': TapIconSpark;
  }
}

import { customElement } from 'lit/decorators.js';
import { SparkFillIcon } from './spark-fill';

@customElement('tap-icon-spark-fill')
export class TapIconSparkFill extends SparkFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-spark-fill': TapIconSparkFill;
  }
}

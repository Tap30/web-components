import { customElement } from 'lit/decorators.js';
import { SparkSmallFillIcon } from './spark-small-fill';

@customElement('tap-icon-spark-small-fill')
export class TapIconSparkSmallFill extends SparkSmallFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-spark-small-fill': TapIconSparkSmallFill;
  }
}

import { customElement } from 'lit/decorators.js';
import { SparkSmallIcon } from './spark-small';

@customElement('tap-icon-spark-small')
export class TapIconSparkSmall extends SparkSmallIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-spark-small': TapIconSparkSmall;
  }
}

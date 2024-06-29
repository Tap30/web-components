import { customElement } from 'lit/decorators.js';
import { SparkThreeFillIcon } from './spark-three-fill';

@customElement('tap-icon-spark-three-fill')
export class TapIconSparkThreeFill extends SparkThreeFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-spark-three-fill': TapIconSparkThreeFill;
  }
}

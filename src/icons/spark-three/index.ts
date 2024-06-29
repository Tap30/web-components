import { customElement } from 'lit/decorators.js';
import { SparkThreeIcon } from './spark-three';

@customElement('tap-icon-spark-three')
export class TapIconSparkThree extends SparkThreeIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-spark-three': TapIconSparkThree;
  }
}

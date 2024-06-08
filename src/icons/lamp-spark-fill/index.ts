import { customElement } from 'lit/decorators.js';
import { LampSparkFillIcon } from './lamp-spark-fill';

@customElement('tap-icon-lamp-spark-fill')
export class TapIconLampSparkFill extends LampSparkFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-lamp-spark-fill': TapIconLampSparkFill;
  }
}

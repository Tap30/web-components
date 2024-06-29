import { customElement } from 'lit/decorators.js';
import { CardSparkFillIcon } from './card-spark-fill';

@customElement('tap-icon-card-spark-fill')
export class TapIconCardSparkFill extends CardSparkFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-card-spark-fill': TapIconCardSparkFill;
  }
}

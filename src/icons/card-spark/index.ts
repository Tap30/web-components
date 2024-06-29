import { customElement } from 'lit/decorators.js';
import { CardSparkIcon } from './card-spark';

@customElement('tap-icon-card-spark')
export class TapIconCardSpark extends CardSparkIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-card-spark': TapIconCardSpark;
  }
}

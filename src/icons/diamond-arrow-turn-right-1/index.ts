import { customElement } from 'lit/decorators.js';
import { DiamondArrowTurnRight1Icon } from './diamond-arrow-turn-right-1';

@customElement('tap-icon-diamond-arrow-turn-right-1')
export class TapIconDiamondArrowTurnRight1 extends DiamondArrowTurnRight1Icon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-diamond-arrow-turn-right-1': TapIconDiamondArrowTurnRight1;
  }
}

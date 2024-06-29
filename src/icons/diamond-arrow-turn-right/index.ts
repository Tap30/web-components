import { customElement } from 'lit/decorators.js';
import { DiamondArrowTurnRightIcon } from './diamond-arrow-turn-right';

@customElement('tap-icon-diamond-arrow-turn-right')
export class TapIconDiamondArrowTurnRight extends DiamondArrowTurnRightIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-diamond-arrow-turn-right': TapIconDiamondArrowTurnRight;
  }
}

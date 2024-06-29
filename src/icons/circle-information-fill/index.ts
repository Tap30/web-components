import { customElement } from 'lit/decorators.js';
import { CircleInformationFillIcon } from './circle-information-fill';

@customElement('tap-icon-circle-information-fill')
export class TapIconCircleInformationFill extends CircleInformationFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-information-fill': TapIconCircleInformationFill;
  }
}

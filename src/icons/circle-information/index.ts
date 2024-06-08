import { customElement } from 'lit/decorators.js';
import { CircleInformationIcon } from './circle-information';

@customElement('tap-icon-circle-information')
export class TapIconCircleInformation extends CircleInformationIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-circle-information': TapIconCircleInformation;
  }
}

import { customElement } from 'lit/decorators.js';
import { InfoIcon } from './info';

@customElement('tap-icon-info')
export class TapIconInfo extends InfoIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-info': TapIconInfo;
  }
}

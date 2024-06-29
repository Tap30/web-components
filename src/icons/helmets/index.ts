import { customElement } from 'lit/decorators.js';
import { HelmetsIcon } from './helmets';

@customElement('tap-icon-helmets')
export class TapIconHelmets extends HelmetsIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-helmets': TapIconHelmets;
  }
}

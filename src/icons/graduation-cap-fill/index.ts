import { customElement } from 'lit/decorators.js';
import { GraduationCapFillIcon } from './graduation-cap-fill';

@customElement('tap-icon-graduation-cap-fill')
export class TapIconGraduationCapFill extends GraduationCapFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-graduation-cap-fill': TapIconGraduationCapFill;
  }
}

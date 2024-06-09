import { customElement } from 'lit/decorators.js';
import { GraduationCapIcon } from './graduation-cap';

@customElement('tap-icon-graduation-cap')
export class TapIconGraduationCap extends GraduationCapIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-graduation-cap': TapIconGraduationCap;
  }
}

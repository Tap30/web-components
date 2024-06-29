import { customElement } from 'lit/decorators.js';
import { BriefcaseFillIcon } from './briefcase-fill';

@customElement('tap-icon-briefcase-fill')
export class TapIconBriefcaseFill extends BriefcaseFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-briefcase-fill': TapIconBriefcaseFill;
  }
}

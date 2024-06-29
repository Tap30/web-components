import { customElement } from 'lit/decorators.js';
import { BriefcaseIcon } from './briefcase';

@customElement('tap-icon-briefcase')
export class TapIconBriefcase extends BriefcaseIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-briefcase': TapIconBriefcase;
  }
}

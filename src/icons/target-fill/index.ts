import { customElement } from 'lit/decorators.js';
import { TargetFillIcon } from './target-fill';

@customElement('tap-icon-target-fill')
export class TapIconTargetFill extends TargetFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-target-fill': TapIconTargetFill;
  }
}

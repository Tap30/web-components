import { customElement } from 'lit/decorators.js';
import { TargetIcon } from './target';

@customElement('tap-icon-target')
export class TapIconTarget extends TargetIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-target': TapIconTarget;
  }
}

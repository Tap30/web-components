import { customElement } from 'lit/decorators.js';
import { PlaneFillIcon } from './plane-fill';

@customElement('tap-icon-plane-fill')
export class TapIconPlaneFill extends PlaneFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-plane-fill': TapIconPlaneFill;
  }
}

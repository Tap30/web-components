import { customElement } from 'lit/decorators.js';
import { CouponFillIcon } from './coupon-fill';

@customElement('tap-icon-coupon-fill')
export class TapIconCouponFill extends CouponFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-coupon-fill': TapIconCouponFill;
  }
}

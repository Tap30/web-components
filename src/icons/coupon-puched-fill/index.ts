import { customElement } from 'lit/decorators.js';
import { CouponPuchedFillIcon } from './coupon-puched-fill';

@customElement('tap-icon-coupon-puched-fill')
export class TapIconCouponPuchedFill extends CouponPuchedFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-coupon-puched-fill': TapIconCouponPuchedFill;
  }
}

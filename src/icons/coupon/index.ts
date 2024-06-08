import { customElement } from 'lit/decorators.js';
import { CouponIcon } from './coupon';

@customElement('tap-icon-coupon')
export class TapIconCoupon extends CouponIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-coupon': TapIconCoupon;
  }
}

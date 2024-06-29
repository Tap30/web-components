import { customElement } from 'lit/decorators.js';
import { CouponPuchedIcon } from './coupon-puched';

@customElement('tap-icon-coupon-puched')
export class TapIconCouponPuched extends CouponPuchedIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-coupon-puched': TapIconCouponPuched;
  }
}

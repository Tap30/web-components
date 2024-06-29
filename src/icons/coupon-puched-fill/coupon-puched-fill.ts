import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CouponPuchedFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20 4C21.0544 4 21.9182 4.81588 21.9945 5.85074L22 6V10C20.8954 10 20 10.8954 20 12C20 13.0544 20.8159 13.9182 21.8507 13.9945L22 14V18C22 19.0544 21.1841 19.9182 20.1493 19.9945L20 20H4C2.94564 20 2.08183 19.1841 2.00549 18.1493L2 18V14C3.10457 14 4 13.1046 4 12C4 10.9456 3.18412 10.0818 2.14926 10.0055L2 10V6C2 4.94564 2.81588 4.08183 3.85074 4.00549L4 4H20ZM14.8284 7.75736L7.75736 14.8284L9.17157 16.2426L16.2426 9.17157L14.8284 7.75736ZM16 14H14V16H16V14ZM10 8H8V10H10V8Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

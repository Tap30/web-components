import { html } from 'lit';
import { TapIcon } from '../../icon';

export class PhoneIcon extends TapIcon {
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
          d="M18 2C19.0544 2 19.9182 2.81588 19.9945 3.85074L20 4V20C20 21.0544 19.1841 21.9182 18.1493 21.9945L18 22H6C4.94564 22 4.08183 21.1841 4.00549 20.1493L4 20V4C4 2.94564 4.81588 2.08183 5.85074 2.00549L6 2H18ZM18 4H6V20H18V4ZM15 16.5V18H9V16.5H15ZM13 6V8H11V6H13Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

import { html } from 'lit';
import { TapIcon } from '../../icon';

export class BriefcaseIcon extends TapIcon {
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
          d="M15 2C16.0544 2 16.9182 2.81588 16.9945 3.85074L17 4V6H20C21.0544 6 21.9182 6.81588 21.9945 7.85074L22 8V18C22 19.0544 21.1841 19.9182 20.1493 19.9945L20 20H4C2.94564 20 2.08183 19.1841 2.00549 18.1493L2 18V8C2 6.94564 2.81588 6.08183 3.85074 6.00549L4 6H7V4C7 2.94564 7.81588 2.08183 8.85074 2.00549L9 2H15ZM20 8H4V18H20V8ZM15 4H9V6H15V4Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

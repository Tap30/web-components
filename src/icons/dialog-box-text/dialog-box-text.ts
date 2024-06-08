import { html } from 'lit';
import { TapIcon } from '../../icon';

export class DialogBoxTextIcon extends TapIcon {
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
          d="M4 4C2.94564 4 2.08183 4.81588 2.00549 5.85074L2 6V18C2 19.0544 2.81588 19.9182 3.85074 19.9945L4 20H12.5713L15.2573 22.745L16.6868 21.3462L14.0008 18.6012C13.6664 18.2594 13.2221 18.0502 12.7497 18.008L12.5713 18H4V6H20V18H16.953V20H20C21.0544 20 21.9182 19.1841 21.9945 18.1493L22 18V6C22 4.94564 21.1841 4.08183 20.1493 4.00549L20 4H4ZM10.0476 13.0121V15.0121H18V13.0121H10.0476ZM14.0476 9.0121V11.0121H18V9.0121H14.0476Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

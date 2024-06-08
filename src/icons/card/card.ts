import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CardIcon extends TapIcon {
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
          d="M20 4C21.0544 4 21.9182 4.81588 21.9945 5.85074L22 6V18C22 19.0544 21.1841 19.9182 20.1493 19.9945L20 20H4C2.94564 20 2.08183 19.1841 2.00549 18.1493L2 18V6C2 4.94564 2.81588 4.08183 3.85074 4.00549L4 4H20ZM20 11H4V18H20V11ZM10 13V15H6V13H10ZM20 6H4V9H20V6Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

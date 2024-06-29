import { html } from 'lit';
import { TapIcon } from '../../icon';

export class TrashFillIcon extends TapIcon {
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
          d="M14 5H10V7H8V5C8 3.94564 8.81588 3.08183 9.85074 3.00549L10 3H14C15.0544 3 15.9182 3.81588 15.9945 4.85074L16 5V7H21V9H19V19C19 20.0544 18.1841 20.9182 17.1493 20.9945L17 21H7C5.94564 21 5.08183 20.1841 5.00549 19.1493L5 19V9H3V7H14V5Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

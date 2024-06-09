import { html } from 'lit';
import { TapIcon } from '../../icon';

export class ShieldTickFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1301)">
          <path
            d="M12 2C8 2 4 4 4 4V14.09C4 18 8.81 21 12 22C15.17 21 20 18 20 14.09V4C20 4 16 2 12 2ZM10.94 15.54L7.4 12L8.81 10.59L10.93 12.71L15.17 8.47L16.58 9.88L10.94 15.54Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1301">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

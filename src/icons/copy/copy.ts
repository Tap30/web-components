import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CopyIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_281)">
          <path
            d="M16 2H6C4.9 2 4 2.9 4 4V16H6V4H16V2ZM18 6H10C8.9 6 8 6.9 8 8V20C8 21.1 8.9 22 10 22H18C19.1 22 20 21.1 20 20V8C20 6.9 19.1 6 18 6ZM18 20H10V8H18V20Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_281">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

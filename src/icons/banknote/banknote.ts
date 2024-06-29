import { html } from 'lit';
import { TapIcon } from '../../icon';

export class BanknoteIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1010)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M23 5V19H1V5H23ZM21 7H3V17H21V7ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9ZM12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11ZM19 11V13H17V11H19ZM7 11V13H5V11H7Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1010">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

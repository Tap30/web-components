import { html } from 'lit';
import { TapIcon } from '../../icon';

export class ShoppingCartFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_260)">
          <path
            d="M16 18C17.1 18 17.99 18.9 17.99 20C17.99 21.1 17.1 22 16 22C14.9 22 14 21.1 14 20C14 18.9 14.9 18 16 18ZM22 2V4H20L16.4 11.59L17.75 14.04C17.91 14.32 18 14.65 18 15C18 16.1 17.1 17 16 17H4V15H15.58C15.72 15 15.83 14.89 15.83 14.75L15.8 14.63L14.9 13H7.45C6.7 13 6.04 12.59 5.7 11.97L2.12 5.48C2.04 5.34 2 5.17 2 5C2 4.45 2.45 4 3 4H17.79L18.73 2H22ZM6 18C7.1 18 7.99 18.9 7.99 20C7.99 21.1 7.1 22 6 22C4.9 22 4 21.1 4 20C4 18.9 4.9 18 6 18Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_260">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

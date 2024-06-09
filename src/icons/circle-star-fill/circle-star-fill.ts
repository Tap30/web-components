import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CircleStarFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1498)">
          <path
            d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM15.22 17.39L12 15.45L8.78 17.39C8.4 17.62 7.93 17.28 8.03 16.85L8.88 13.19L6.05 10.74C5.72 10.45 5.9 9.9 6.34 9.86L10.08 9.54L11.54 6.09C11.71 5.68 12.29 5.68 12.46 6.09L13.92 9.53L17.66 9.85C18.1 9.89 18.28 10.44 17.94 10.73L15.11 13.18L15.96 16.85C16.06 17.28 15.6 17.62 15.22 17.39Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1498">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

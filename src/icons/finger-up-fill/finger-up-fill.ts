import { html } from 'lit';
import { TapIcon } from '../../icon';

export class FingerUpFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_807)">
          <path
            d="M19.98 14.82L19.35 19.28C19.21 20.27 18.36 21 17.37 21H11.21C10.68 21 9.92 20.79 9.55 20.41L5 15.62L5.83 14.78C6.07 14.54 6.41 14.43 6.75 14.5L10 15.24V4.5C10 3.67 10.67 3 11.5 3C12.33 3 13 3.67 13 4.5V10.5H13.91C14.22 10.5 14.53 10.57 14.8 10.71L18.89 12.75C19.66 13.14 20.1 13.97 19.98 14.82Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_807">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

import { html } from 'lit';
import { TapIcon } from '../../icon';

export class DiamondArrowTurnRightIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1178)">
          <path
            d="M22.4299 10.59L13.4199 1.57999C12.6699 0.829989 11.3499 0.819989 10.5899 1.57999L1.58988 10.58C0.809883 11.36 0.809883 12.62 1.58988 13.4L10.5899 22.4C10.9799 22.79 11.4899 22.98 11.9999 22.98C12.5099 22.98 13.0199 22.79 13.4099 22.4L22.3999 13.41C23.1899 12.65 23.1999 11.39 22.4299 10.59ZM12.0099 20.99L3.00988 11.99L12.0099 2.98999L21.0099 11.99L12.0099 20.99ZM7.99988 11V15H9.99988V12H13.9999V14.5L17.4999 11L13.9999 7.49999V9.99999H8.99988C8.44988 9.99999 7.99988 10.45 7.99988 11Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1178">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

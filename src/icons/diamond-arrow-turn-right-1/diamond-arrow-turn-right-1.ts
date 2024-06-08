import { html } from 'lit';
import { TapIcon } from '../../icon';

export class DiamondArrowTurnRight1Icon extends TapIcon {
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
          d="M13.4199 1.57999L22.4299 10.59C23.1999 11.39 23.1899 12.65 22.3999 13.41L13.4099 22.4C13.0199 22.79 12.5099 22.98 11.9999 22.98C11.4899 22.98 10.9799 22.79 10.5899 22.4L1.58988 13.4C0.809883 12.62 0.809883 11.36 1.58988 10.58L10.5899 1.57999C11.3499 0.819989 12.6699 0.829989 13.4199 1.57999ZM8 15V11C8 10.45 8.45 10 9 10H14V7.5L17.5 11L14 14.5V12H10V15H8Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

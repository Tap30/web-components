import { html } from 'lit';
import { TapIcon } from '../../icon';

export class ClockFillIcon extends TapIcon {
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
          d="M18.364 5.63604C14.8492 2.12132 9.15076 2.12132 5.63604 5.63604C2.12132 9.15076 2.12132 14.8492 5.63604 18.364C9.15076 21.8787 14.8492 21.8787 18.364 18.364C21.8787 14.8492 21.8787 9.15076 18.364 5.63604ZM12.9 11.5183V7.5H11.1V12.4817L14.9496 15.0481L15.9481 13.5504L12.9 11.5183Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

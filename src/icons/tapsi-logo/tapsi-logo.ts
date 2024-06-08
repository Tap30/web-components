import { html } from 'lit';
import { TapIcon } from '../../icon';

export class TapsiLogoIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_706)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.9 6H22.5V10.2H9.9V6ZM1.5 14.4H22.5V18.6H1.5V14.4Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_706">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

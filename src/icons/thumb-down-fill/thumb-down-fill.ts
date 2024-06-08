import { html } from 'lit';
import { TapIcon } from '../../icon';

export class ThumbDownFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_797)">
          <path
            d="M6 3H16V16L9 23L7.75 21.75C7.63333 21.6333 7.5375 21.475 7.4625 21.275C7.3875 21.075 7.35 20.8833 7.35 20.7V20.35L8.45 16H3C2.46667 16 2 15.8 1.6 15.4C1.2 15 1 14.5333 1 14V12C1 11.8833 1.0125 11.7583 1.0375 11.625C1.0625 11.4917 1.1 11.3667 1.15 11.25L4.15 4.2C4.3 3.86667 4.55 3.58333 4.9 3.35C5.25 3.11667 5.61667 3 6 3ZM18 16V3H22V16H18Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_797">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

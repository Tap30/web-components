import { html } from 'lit';
import { TapIcon } from '../../icon';

export class PlayIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1259)">
          <path
            d="M9.525 18.025C9.19167 18.2417 8.85417 18.2542 8.5125 18.0625C8.17083 17.8708 8 17.575 8 17.175V6.825C8 6.425 8.17083 6.12917 8.5125 5.9375C8.85417 5.74583 9.19167 5.75833 9.525 5.975L17.675 11.15C17.975 11.35 18.125 11.6333 18.125 12C18.125 12.3667 17.975 12.65 17.675 12.85L9.525 18.025Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1259">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

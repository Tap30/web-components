import { html } from 'lit';
import { TapIcon } from '../../icon';

export class ThumbUpFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_789)">
          <path
            d="M6 21H16V8L9 1L7.75 2.25C7.63333 2.36667 7.5375 2.525 7.4625 2.725C7.3875 2.925 7.35 3.11667 7.35 3.3V3.65L8.45 8H3C2.46667 8 2 8.2 1.6 8.6C1.2 9 1 9.46667 1 10V12C1 12.1167 1.0125 12.2417 1.0375 12.375C1.0625 12.5083 1.1 12.6333 1.15 12.75L4.15 19.8C4.3 20.1333 4.55 20.4167 4.9 20.65C5.25 20.8833 5.61667 21 6 21ZM18 8V21H22V8H18Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_789">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="matrix(-1 0 0 1 24 0)"
            />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

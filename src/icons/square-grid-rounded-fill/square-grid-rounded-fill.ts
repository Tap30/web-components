import { html } from 'lit';
import { TapIcon } from '../../icon';

export class SquareGridRoundedFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_363)">
          <path
            d="M3 7C3 4.79086 4.79086 3 7 3H11.4343V21H7C4.79086 21 3 19.2091 3 17V7Z"
            fill="currentColor"
          />
          <path
            d="M13.4343 21H17C19.2091 21 21 19.2091 21 17V12H13.4343V21Z"
            fill="currentColor"
          />
          <path
            d="M21 10V7C21 4.79086 19.2091 3 17 3H13.4343V10H21Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_363">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

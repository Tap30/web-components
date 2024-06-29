import { html } from 'lit';
import { TapIcon } from '../../icon';

export class SquareGridRoundedIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_360)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7 3C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3H7ZM17 5H13V10H19V7C19 5.89543 18.1046 5 17 5ZM19 12H13V19H17C18.1046 19 19 18.1046 19 17V12ZM11 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H11V5Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_360">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

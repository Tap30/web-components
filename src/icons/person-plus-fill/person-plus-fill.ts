import { html } from 'lit';
import { TapIcon } from '../../icon';

export class PersonPlusFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1667)">
          <path
            d="M10 4C12.21 4 14 5.79 14 8C14 10.21 12.21 12 10 12C7.79 12 6 10.21 6 8C6 5.79 7.79 4 10 4Z"
            fill="currentColor"
          />
          <path
            d="M19 12H16V10H19V7H21V10H24V12H21V15H19V12Z"
            fill="currentColor"
          />
          <path
            d="M2 20V18C2 15.34 7.33 14 10 14C12.67 14 18 15.34 18 18V20H2Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1667">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

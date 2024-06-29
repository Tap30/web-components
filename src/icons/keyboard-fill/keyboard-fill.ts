import { html } from 'lit';
import { TapIcon } from '../../icon';

export class KeyboardFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_959)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V5C23 3.9 22.1 3 21 3ZM16 15H8V17H16V15ZM5 11H7V13H5V11ZM11 11H9V13H11V11ZM13 11H15V13H13V11ZM19 11H17V13H19V11ZM17 7H19V9H17V7ZM15 7H13V9H15V7ZM9 7H11V9H9V7ZM7 7H5V9H7V7Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_959">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

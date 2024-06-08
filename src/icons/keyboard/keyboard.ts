import { html } from 'lit';
import { TapIcon } from '../../icon';

export class KeyboardIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_956)">
          <path
            d="M21 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19V5C23 3.9 22.1 3 21 3ZM21 19H3V5H21V19ZM9 7H11V9H9V7ZM5 7H7V9H5V7ZM8 15H16V17H8V15ZM13 7H15V9H13V7ZM9 11H11V13H9V11ZM5 11H7V13H5V11ZM13 11H15V13H13V11ZM17 7H19V9H17V7ZM17 11H19V13H17V11Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_956">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

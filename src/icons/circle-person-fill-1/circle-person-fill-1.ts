import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CirclePersonFill1Icon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1645)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM14.5 9.5C14.5 10.8813 13.3813 12 12 12C10.6187 12 9.5 10.8813 9.5 9.5C9.5 8.11875 10.6187 7 12 7C13.3813 7 14.5 8.11875 14.5 9.5ZM7 15.75C7 14.0875 10.3313 13.25 12 13.25C13.6687 13.25 17 14.0875 17 15.75C17 16.4404 16.4404 17 15.75 17H8.25C7.55964 17 7 16.4404 7 15.75Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1645">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

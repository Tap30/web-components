import { html } from 'lit';
import { TapIcon } from '../../icon';

export class ImageFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1238)">
          <path
            d="M13.5 6C12.7 6 12 6.7 12 7.5C12 8.3 12.7 9 13.5 9C14.3 9 15 8.3 15 7.5C15 6.7 14.3 6 13.5 6ZM19 2H5C3.3 2 2 3.3 2 5V19C2 20.7 3.3 22 5 22H19C20.7 22 22 20.7 22 19V5C22 3.3 20.7 2 19 2ZM20 13.9L18.1 12C16.9 10.9 15 10.9 13.9 12L13 12.9L10.1 10C8.9 8.9 7 8.9 5.9 10L4 11.9V5C4 4.4 4.4 4 5 4H19C19.6 4 20 4.4 20 5V13.9Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1238">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

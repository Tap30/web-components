import { html } from 'lit';
import { TapIcon } from '../../icon';

export class PinWaveFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1110)">
          <path
            d="M11.78 9C8.63 9 5.78 11.41 5.78 15.15C5.78 17.64 7.78 20.59 11.78 24C15.78 20.59 17.78 17.64 17.78 15.15C17.78 11.41 14.93 9 11.78 9ZM11.78 16.5C10.95 16.5 10.28 15.83 10.28 15C10.28 14.17 10.95 13.5 11.78 13.5C12.61 13.5 13.28 14.17 13.28 15C13.28 15.83 12.61 16.5 11.78 16.5ZM11.78 4C13.71 4 15.46 4.78 16.73 6.05L15.32 7.46C14.41 6.56 13.16 6 11.78 6C10.4 6 9.15 6.56 8.24 7.46L6.83 6.05C8.1 4.78 9.85 4 11.78 4ZM19.56 3.23L18.15 4.64C16.52 3.01 14.27 2 11.79 2C9.31 2 7.05 3.01 5.42 4.63L4 3.22C6 1.23 8.75 0 11.79 0C14.83 0 17.57 1.23 19.56 3.23Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1110">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

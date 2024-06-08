import { html } from 'lit';
import { TapIcon } from '../../icon';

export class MoreHorizontalFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_415)">
          <path
            d="M5.25 9.75C4.0125 9.75 3 10.7625 3 12C3 13.2375 4.0125 14.25 5.25 14.25C6.4875 14.25 7.5 13.2375 7.5 12C7.5 10.7625 6.4875 9.75 5.25 9.75ZM18.75 9.75C17.5125 9.75 16.5 10.7625 16.5 12C16.5 13.2375 17.5125 14.25 18.75 14.25C19.9875 14.25 21 13.2375 21 12C21 10.7625 19.9875 9.75 18.75 9.75ZM12 9.75C10.7625 9.75 9.75 10.7625 9.75 12C9.75 13.2375 10.7625 14.25 12 14.25C13.2375 14.25 14.25 13.2375 14.25 12C14.25 10.7625 13.2375 9.75 12 9.75Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_415">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

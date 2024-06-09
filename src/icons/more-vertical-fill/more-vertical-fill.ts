import { html } from 'lit';
import { TapIcon } from '../../icon';

export class MoreVerticalFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_407)">
          <path
            d="M9.75 18.75C9.75 19.9875 10.7625 21 12 21C13.2375 21 14.25 19.9875 14.25 18.75C14.25 17.5125 13.2375 16.5 12 16.5C10.7625 16.5 9.75 17.5125 9.75 18.75ZM9.75 5.25C9.75 6.4875 10.7625 7.5 12 7.5C13.2375 7.5 14.25 6.4875 14.25 5.25C14.25 4.0125 13.2375 3 12 3C10.7625 3 9.75 4.0125 9.75 5.25ZM9.75 12C9.75 13.2375 10.7625 14.25 12 14.25C13.2375 14.25 14.25 13.2375 14.25 12C14.25 10.7625 13.2375 9.75 12 9.75C10.7625 9.75 9.75 10.7625 9.75 12Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_407">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

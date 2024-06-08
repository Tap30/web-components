import { html } from 'lit';
import { TapIcon } from '../../icon';

export class MedalIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1508)">
          <path
            d="M7 2H17V9.85C17 10.2333 16.9167 10.575 16.75 10.875C16.5833 11.175 16.35 11.4167 16.05 11.6L12.5 13.7L13.2 16H17L13.9 18.2L15.1 22L12 19.65L8.9 22L10.1 18.2L7 16H10.8L11.5 13.7L7.95 11.6C7.65 11.4167 7.41667 11.175 7.25 10.875C7.08333 10.575 7 10.2333 7 9.85V2ZM9 4V9.85L11 11.05V4H9ZM15 4H13V11.05L15 9.85V4Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1508">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

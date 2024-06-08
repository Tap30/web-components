import { html } from 'lit';
import { TapIcon } from '../../icon';

export class SquareFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1223)">
          <path
            d="M8 10.5C8 9.11929 9.11929 8 10.5 8H13.5C14.8807 8 16 9.11929 16 10.5V13.5C16 14.8807 14.8807 16 13.5 16H10.5C9.11929 16 8 14.8807 8 13.5V10.5Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1223">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

import { html } from 'lit';
import { TapIcon } from '../../icon';

export class PlaneFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1619)">
          <path
            d="M8.5 22V20.5L10.5 19V13.5L2 16V14L10.5 9V3.5C10.5 3.08333 10.6458 2.72917 10.9375 2.4375C11.2292 2.14583 11.5833 2 12 2C12.4167 2 12.7708 2.14583 13.0625 2.4375C13.3542 2.72917 13.5 3.08333 13.5 3.5V9L22 14V16L13.5 13.5V19L15.5 20.5V22L12 21L8.5 22Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1619">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

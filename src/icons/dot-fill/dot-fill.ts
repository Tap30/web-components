import { html } from 'lit';
import { TapIcon } from '../../icon';

export class DotFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1218)">
          <circle cx="12" cy="12" r="4" fill="currentColor" />
        </g>
        <defs>
          <clipPath id="clip0_24_1218">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

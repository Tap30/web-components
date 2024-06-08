import { html } from 'lit';
import { TapIcon } from '../../icon';

export class StickyNoteFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_433)">
          <path
            d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V15L15 21H5ZM14 19L19 14H14V19ZM7 14H12V12H7V14ZM7 10H17V8H7V10Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_433">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

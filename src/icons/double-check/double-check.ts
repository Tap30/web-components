import { html } from 'lit';
import { TapIcon } from '../../icon';

export class DoubleCheckIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_873)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.4834 6.48413L15.5841 7.5849L6.82708 16.4496L2.86816 12.6216L3.96895 11.5208L6.82671 14.2479L14.4834 6.48413ZM18.9746 6.48413L20.0753 7.5849L11.3183 16.4496L10.2549 15.3717L11.3179 14.2479L18.9746 6.48413Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_873">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

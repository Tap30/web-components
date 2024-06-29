import { html } from 'lit';
import { TapIcon } from '../../icon';

export class ArrowTopRightIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1162)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.10557 11.211L3.96057 11.291C2.42357 12.209 2.79457 14.599 4.60757 14.961L8.29957 15.7L9.03857 19.392C9.41157 21.26 11.9366 21.598 12.7886 19.894L18.7886 7.89402C19.6486 6.17502 17.8246 4.35202 16.1056 5.21102L4.10557 11.211ZM16.9996 7.00002L10.9996 19L9.99957 14L4.99957 13L16.9996 7.00002Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1162">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

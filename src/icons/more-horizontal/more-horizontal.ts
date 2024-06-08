import { html } from 'lit';
import { TapIcon } from '../../icon';

export class MoreHorizontalIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_412)">
          <path
            d="M6.5 10.5C7.32843 10.5 8 11.1716 8 12C8 12.8284 7.32843 13.5 6.5 13.5C5.67157 13.5 5 12.8284 5 12C5 11.1716 5.67157 10.5 6.5 10.5Z"
            fill="currentColor"
          />
          <path
            d="M12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5Z"
            fill="currentColor"
          />
          <path
            d="M19 12C19 11.1716 18.3284 10.5 17.5 10.5C16.6716 10.5 16 11.1716 16 12C16 12.8284 16.6716 13.5 17.5 13.5C18.3284 13.5 19 12.8284 19 12Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_412">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

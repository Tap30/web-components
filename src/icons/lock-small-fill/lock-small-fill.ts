import { html } from 'lit';
import { TapIcon } from '../../icon';

export class LockSmallFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1315)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 8.5V9.5C6.89543 9.5 6 10.3954 6 11.5V17.5C6 18.6046 6.89543 19.5 8 19.5H16C17.1046 19.5 18 18.6046 18 17.5V11.5C18 10.3954 17.1046 9.5 16 9.5V8.5C16 6.29086 14.2091 4.5 12 4.5C9.79086 4.5 8 6.29086 8 8.5ZM14 9.5V8.5C14 7.39543 13.1046 6.5 12 6.5C10.8954 6.5 10 7.39543 10 8.5V9.5H14ZM12 16C12.8284 16 13.5 15.3284 13.5 14.5C13.5 13.6716 12.8284 13 12 13C11.1716 13 10.5 13.6716 10.5 14.5C10.5 15.3284 11.1716 16 12 16Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1315">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

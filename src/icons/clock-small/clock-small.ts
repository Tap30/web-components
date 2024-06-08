import { html } from 'lit';
import { TapIcon } from '../../icon';

export class ClockSmallIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1579)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 17.4444C15.0069 17.4444 17.4444 15.0069 17.4444 12C17.4444 8.99312 15.0069 6.55556 12 6.55556C8.99312 6.55556 6.55556 8.99312 6.55556 12C6.55556 15.0069 8.99312 17.4444 12 17.4444ZM12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12.7778 11.6658V7.64475H11.2222V12.3079L11.2211 12.309L11.2222 12.3102V12.3114H11.2235L13.6534 14.7413L14.7533 13.6414L12.7778 11.6658Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1579">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

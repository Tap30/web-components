import { html } from 'lit';
import { TapIcon } from '../../icon';

export class BanknoteTwoIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1018)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M23 5V16H19V19H1V9L4 8.999V5H23ZM17 11H3V17H17V11ZM10 11.75C11.2426 11.75 12.25 12.7574 12.25 14C12.25 15.2426 11.2426 16.25 10 16.25C8.75736 16.25 7.75 15.2426 7.75 14C7.75 12.7574 8.75736 11.75 10 11.75ZM14.5 13C15.0523 13 15.5 13.4477 15.5 14C15.5 14.5523 15.0523 15 14.5 15C13.9477 15 13.5 14.5523 13.5 14C13.5 13.4477 13.9477 13 14.5 13ZM5.5 13C6.05228 13 6.5 13.4477 6.5 14C6.5 14.5523 6.05228 15 5.5 15C4.94772 15 4.5 14.5523 4.5 14C4.5 13.4477 4.94772 13 5.5 13ZM10 13.25C9.58579 13.25 9.25 13.5858 9.25 14C9.25 14.4142 9.58579 14.75 10 14.75C10.4142 14.75 10.75 14.4142 10.75 14C10.75 13.5858 10.4142 13.25 10 13.25ZM21 7H6V8.999L19 9V14H21V7Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1018">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

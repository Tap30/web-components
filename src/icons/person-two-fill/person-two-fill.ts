import { html } from 'lit';
import { TapIcon } from '../../icon';

export class PersonTwoFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1683)">
          <path
            d="M13 8C13 10.2091 11.2091 12 9 12C6.79086 12 5 10.2091 5 8C5 5.79086 6.79086 4 9 4C11.2091 4 13 5.79086 13 8Z"
            fill="currentColor"
          />
          <path
            d="M18.9999 17C18.9999 15.32 18.0399 14.06 16.6699 13.13C19.4299 13.53 22.9999 14.82 22.9999 17V20H18.9999V17Z"
            fill="currentColor"
          />
          <path
            d="M14.9999 12C17.2099 12 18.9999 10.21 18.9999 8C18.9999 5.79 17.2099 4 14.9999 4C14.5299 4 14.0899 4.1 13.6699 4.24C14.4999 5.27 14.9999 6.58 14.9999 8C14.9999 9.42 14.4999 10.73 13.6699 11.76C14.0899 11.9 14.5299 12 14.9999 12Z"
            fill="currentColor"
          />
          <path
            d="M1 17C1 14.34 6.33 13 9 13C11.67 13 17 14.34 17 17V20H1V17Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1683">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

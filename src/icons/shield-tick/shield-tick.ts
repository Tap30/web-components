import { html } from 'lit';
import { TapIcon } from '../../icon';

export class ShieldTickIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1298)">
          <path
            d="M7.40002 12L10.94 15.54L16.58 9.87997L15.17 8.46997L10.93 12.71L8.81002 10.59L7.40002 12Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 2C16 2 20 4 20 4V14.09C20 18 15.17 21 12 22C8.81 21 4 18 4 14.09V4C4 4 8 2 12 2ZM15.8931 17.6126C14.7116 18.6174 13.2501 19.408 11.9981 19.8836C10.7409 19.4084 9.27985 18.618 8.10053 17.6136C6.69412 16.4158 6 15.1942 6 14.09V5.30977C6.32341 5.18178 6.70572 5.03961 7.13246 4.89737C8.53263 4.43064 10.3025 4 12 4C13.6975 4 15.4674 4.43064 16.8675 4.89737C17.2943 5.03961 17.6766 5.18178 18 5.30977V14.09C18 15.1913 17.3042 16.4127 15.8931 17.6126Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1298">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

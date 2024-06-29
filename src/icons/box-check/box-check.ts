import { html } from 'lit';
import { TapIcon } from '../../icon';

export class BoxCheckIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_305)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.743 14.996L19.157 16.41L14.5 21.067L11.964 18.531L13.379 17.117L14.499 18.238L17.743 14.996ZM17.449 3L21.089 7.092L20.999 7.17L21 13H19V9H4.99997V19H9.99997V21H4.99997C4.4954 21.0002 4.00941 20.8096 3.63943 20.4665C3.26944 20.1234 3.04282 19.6532 3.00497 19.15L2.99997 19V7.171L2.90997 7.091L6.54997 3H17.45H17.449ZM16.551 5H7.44697L5.66697 7H18.33L16.551 5Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_305">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CardPlusIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1057)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21.3605 4.5335C20.9906 4.19041 20.5046 3.99984 20 4H4L3.85 4.005C3.34684 4.04284 2.87659 4.26947 2.5335 4.63945C2.19041 5.00943 1.99984 5.49542 2 6V18L2.005 18.15C2.04284 18.6532 2.26947 19.1234 2.63945 19.4665C3.00943 19.8096 3.49542 20.0002 4 20H13V18H4V11H22V6L21.995 5.85C21.9572 5.34684 21.7305 4.87659 21.3605 4.5335ZM4 6H20V9H4V6Z"
            fill="currentColor"
          />
          <path d="M10 15V13H6V15H10Z" fill="currentColor" />
          <path
            d="M20 13V16H23V18H20V21H18V18H15V16H18V13H20Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1057">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

import { html } from 'lit';
import { TapIcon } from '../../icon';

export class LineThreeHorizontalDecreaseIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_334)">
          <path
            d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_334">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

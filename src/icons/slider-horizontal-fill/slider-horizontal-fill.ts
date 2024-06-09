import { html } from 'lit';
import { TapIcon } from '../../icon';

export class SliderHorizontalFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9 5V8H1V5H9ZM14.5 3C15.8962 3 17.1014 3.81751 17.6632 4.99997L23 5V8L17.6627 8.00104C17.1007 9.18295 15.8958 10 14.5 10C12.567 10 11 8.433 11 6.5C11 4.567 12.567 3 14.5 3ZM9.5 14C11.433 14 13 15.567 13 17.5C13 19.433 11.433 21 9.5 21C8.10421 21 6.89925 20.183 6.33731 19.001L1 19V16L6.33683 16C6.89857 14.8175 8.10382 14 9.5 14ZM15 16H23V19H15V16Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

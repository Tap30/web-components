import { html } from 'lit';
import { TapIcon } from '../../icon';

export class PinOnMapFillIcon extends TapIcon {
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
          d="M13 9.89998C15.2822 9.43671 17 7.41896 17 5C17 2.23858 14.7614 0 12 0C9.23858 0 7 2.23858 7 5C7 7.41896 8.71776 9.43671 11 9.89998V12H13V9.89998ZM15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5Z"
          fill="currentColor"
        />
        <path
          d="M13 16H11V12H3.67652L1 20H23L20.3235 12H13V16Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

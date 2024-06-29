import { html } from 'lit';
import { TapIcon } from '../../icon';

export class PinOnMapIcon extends TapIcon {
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
          d="M13 9.89998C15.2822 9.43671 17 7.41896 17 5C17 2.23858 14.7614 0 12 0C9.23858 0 7 2.23858 7 5C7 7.41896 8.71776 9.43671 11 9.89998V16H13V9.89998ZM15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5Z"
          fill="currentColor"
        />
        <path
          d="M3.67652 12H7.99998V14H5.12336L3.7851 18H20.2149L18.8766 14H16V12H20.3235L23 20H1L3.67652 12Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

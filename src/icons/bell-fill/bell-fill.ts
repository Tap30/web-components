import { html } from 'lit';
import { TapIcon } from '../../icon';

export class BellFillIcon extends TapIcon {
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
          d="M13.0008 3.08144L13 1H11L11.0002 3.08127C8.16238 3.5569 6 6.02295 6 8.99366L6.00009 12.1618C4.83485 12.5733 4 13.6837 4 14.9889V18.9857L9.17142 18.987C9.17296 18.9914 9.1745 18.9957 9.17605 19H14.8239C14.8255 18.9957 14.8271 18.9913 14.8286 18.987L20 18.9857V14.9889L19.9938 14.7947C19.9157 13.5748 19.1074 12.5533 18.0009 12.1622L18 8.99366C18 6.0233 15.8381 3.55748 13.0008 3.08144Z"
          fill="currentColor"
        />
        <path
          d="M9.5 20H14.5C14.5 21.3807 13.3807 22.5 12 22.5C10.6193 22.5 9.5 21.3807 9.5 20Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

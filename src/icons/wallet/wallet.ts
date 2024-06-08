import { html } from 'lit';
import { TapIcon } from '../../icon';

export class WalletIcon extends TapIcon {
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
          d="M15.5 15.5C16.3284 15.5 17 14.8284 17 14C17 13.1716 16.3284 12.5 15.5 12.5C14.6716 12.5 14 13.1716 14 14C14 14.8284 14.6716 15.5 15.5 15.5Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20 5V3H5L4.82373 3.00509C3.30725 3.09296 2.09296 4.30725 2.00509 5.82373L2 6V19L2.00549 19.1493C2.08183 20.1841 2.94564 21 4 21H20L20.1493 20.9945C21.1841 20.9182 22 20.0544 22 19V9L21.9945 8.85074C21.9182 7.81588 21.0544 7 20 7H5L4.88338 6.99327C4.38604 6.93551 4 6.51284 4 6C4 5.44772 4.44772 5 5 5H20ZM4 19V8.829L4.14827 8.87737C4.41827 8.95717 4.70413 9 5 9H20V19H4Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

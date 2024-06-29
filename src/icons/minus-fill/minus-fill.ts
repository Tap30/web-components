import { html } from 'lit';
import { TapIcon } from '../../icon';

export class MinusFillIcon extends TapIcon {
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
          d="M19 13.5H5V10.5H19V13.5Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

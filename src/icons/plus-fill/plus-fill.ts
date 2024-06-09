import { html } from 'lit';
import { TapIcon } from '../../icon';

export class PlusFillIcon extends TapIcon {
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
          d="M10.5 13.5V20H13.5V13.5H20V10.5H13.5V4H10.5V10.5H4V13.5H10.5Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

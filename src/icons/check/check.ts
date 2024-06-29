import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CheckIcon extends TapIcon {
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
          d="M5.05025 13.0503L6.46447 11.636L10 15.1723L18.4853 6.68629L19.8995 8.10051L10 18L5.05025 13.0503Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

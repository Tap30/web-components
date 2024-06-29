import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CircleExclamationFillIcon extends TapIcon {
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
          d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

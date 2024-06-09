import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CircleInformationFillIcon extends TapIcon {
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
          d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM11 17H13V11H11V17ZM11 9H13V7H11V9Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

import { html } from 'lit';
import { TapIcon } from '../../icon';

export class PlusIcon extends TapIcon {
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
          d="M13 5V11H19V13H13V19H11V13H5V11H11V5H13Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

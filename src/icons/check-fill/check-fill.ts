import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CheckFillIcon extends TapIcon {
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
          d="M20 8.11057L9.11938 19L4 14.0643L6.11879 11.9537L9.11938 14.7789L17.8812 6L20 8.11057Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

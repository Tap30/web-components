import { html } from 'lit';
import { TapIcon } from '../../icon';

export class LineThreeIcon extends TapIcon {
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
          d="M4 18H20V16H4V18ZM4 13H20V11H4V13ZM4 6V8H20V6H4Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

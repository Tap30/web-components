import { html } from 'lit';
import { TapIcon } from '../../icon';

export class InfoFillIcon extends TapIcon {
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
          d="M10.5 8.5H13.5V5.5H10.5V8.5ZM10.5 18.5H13.5V10.5H10.5V18.5Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

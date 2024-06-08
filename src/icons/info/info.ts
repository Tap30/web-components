import { html } from 'lit';
import { TapIcon } from '../../icon';

export class InfoIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11 6H13V8H11V6ZM11 10H13V18H11V10Z" fill="currentColor" />
      </svg>
    `);
  }
}

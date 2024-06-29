import { html } from 'lit';
import { TapIcon } from '../../icon';

export class ExclamationIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11 16H13V18H11V16ZM11 6H13V14H11V6Z" fill="currentColor" />
      </svg>
    `);
  }
}

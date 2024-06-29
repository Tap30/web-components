import { html } from 'lit';
import { TapIcon } from '../../icon';

export class DialogBoxTextFillIcon extends TapIcon {
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
          d="M5 3H19C20.1 3 20.99 3.9 20.99 5L21 22L17 18H5C3.9 18 3 17.1 3 16V5C3 3.9 3.9 3 5 3ZM15 11H17V9H15V11ZM11 11H13V9H11V11ZM7 11H9V9H7V11Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

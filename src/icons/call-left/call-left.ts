import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CallLeftIcon extends TapIcon {
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
          d="M3.99 15.38C5.22 15.38 6.41 15.18 7.52 14.82C7.87 14.7 8.26 14.79 8.53 15.06L10.1 17.03C12.93 15.68 15.58 13.13 16.99 10.2L15.04 8.54C14.77 8.26 14.69 7.87 14.8 7.52C15.17 6.41 15.36 5.22 15.36 3.99C15.36 3.45 15.81 3 16.35 3H19.81C20.35 3 21 3.24 21 3.99C21 13.28 13.27 21 3.99 21C3.28 21 3 20.37 3 19.82V16.37C3 15.83 3.45 15.38 3.99 15.38Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

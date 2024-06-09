import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CallDialogBoxIcon extends TapIcon {
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
          d="M13.5 2C12.6716 2 12 2.67157 12 3.5V13L15 10H20.5C21.3284 10 22 9.32843 22 8.5V3.5C22 2.67157 21.3284 2 20.5 2H13.5Z"
          fill="currentColor"
        />
        <path
          d="M15.48 15.82C16.59 16.18 17.78 16.38 19.01 16.38C19.55 16.38 20 16.83 20 17.37V20.82C20 21.37 19.72 22 19.01 22C9.73 22 2 14.28 2 4.99C2 4.24 2.65 4 3.19 4H6.65C7.19 4 7.64 4.45 7.64 4.99C7.64 6.22 7.83 7.41 8.2 8.52C8.31 8.87 8.23 9.26 7.96 9.54L6.01 11.2C7.42 14.13 10.07 16.68 12.9 18.03L14.47 16.06C14.74 15.79 15.13 15.7 15.48 15.82Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

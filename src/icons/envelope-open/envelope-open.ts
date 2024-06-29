import { html } from 'lit';
import { TapIcon } from '../../icon';

export class EnvelopeOpenIcon extends TapIcon {
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
          d="M12.0074 1.9057L20.8128 5.8223C21.4867 6.12202 21.9368 6.76579 21.9939 7.49273L22 7.64968V18C22 19.0544 21.1841 19.9182 20.1493 19.9945L20 20H4C2.94564 20 2.08183 19.1841 2.00549 18.1493L2 18V7.6501C2 6.91222 2.40569 6.23896 3.04724 5.89159L3.18826 5.82224L12.0074 1.9057ZM12.006 4.09302L4 7.6501V18H20V7.64968L12.006 4.09302ZM17.5563 9.15063L18.4395 10.945L11.9982 14.1155L5.60713 10.9436L6.49626 9.15209L12.001 11.884L17.5563 9.15063Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

import { html } from 'lit';
import { TapIcon } from '../../icon';

export class PencilLineFillIcon extends TapIcon {
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
          d="M12.06 7.19006L15.81 10.9401L6.75 20.0001H3V16.2501L12.06 7.19006ZM20 17.0001V20.0001H10L13 17.0001H20ZM14.96 4.29006C15.32 3.93006 15.8845 3.90237 16.276 4.20698L16.37 4.29006L18.71 6.63006C19.07 6.99006 19.0977 7.55456 18.7931 7.94602L18.71 8.04006L16.88 9.87006L13.13 6.12006L14.96 4.29006Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

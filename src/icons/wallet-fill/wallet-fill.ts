import { html } from 'lit';
import { TapIcon } from '../../icon';

export class WalletFillIcon extends TapIcon {
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
          d="M18.5 4.5C18.5 3.94772 18.0523 3.5 17.5 3.5H5.5L5.32373 3.50509C3.80725 3.59296 2.59296 4.80725 2.50509 6.32373L2.5 6.5V18.5L2.50549 18.6493C2.58183 19.6841 3.44564 20.5 4.5 20.5H19.5L19.6493 20.4945C20.6841 20.4182 21.5 19.5544 21.5 18.5V9.5L21.4945 9.35074C21.4182 8.31588 20.5544 7.5 19.5 7.5H18.5V4.5ZM5.5 5.5H16.5V7.5H5.5L5.38338 7.49327C4.88604 7.43551 4.5 7.01284 4.5 6.5C4.5 5.94772 4.94772 5.5 5.5 5.5ZM16.5 15.5C17.3284 15.5 18 14.8284 18 14C18 13.1716 17.3284 12.5 16.5 12.5C15.6716 12.5 15 13.1716 15 14C15 14.8284 15.6716 15.5 16.5 15.5Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

import { html } from 'lit';
import { TapIcon } from '../../icon';

export class HomeFillIcon extends TapIcon {
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
          d="M22.5148 9.1426L12.0076 2.83374L1.48584 9.14228L2.51429 10.8576L2.99984 10.5657L3.00007 17.9999L3.00555 18.1492C3.0819 19.1841 3.9457 19.9999 5.00007 19.9999H9.50006V14C9.50006 13.4477 9.94778 13 10.5001 13H13.5001C14.0523 13 14.5001 13.4477 14.5001 14V19.9999H19.0001L19.1493 19.9944C20.1842 19.9181 21.0001 19.0543 21.0001 17.9999L20.9998 10.5657L21.4853 10.8573L22.5148 9.1426Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

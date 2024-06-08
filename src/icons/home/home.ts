import { html } from 'lit';
import { TapIcon } from '../../icon';

export class HomeIcon extends TapIcon {
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
          d="M22.5148 9.14266L12.0076 2.8338L1.48584 9.14234L2.51429 10.8576L2.99984 10.5658L3.00007 18L3.00555 18.1493C3.0819 19.1841 3.9457 20 5.00007 20H19.0001L19.1493 19.9945C20.1842 19.9182 21.0001 19.0544 21.0001 18L20.9998 10.5658L21.4853 10.8573L22.5148 9.14266ZM4.99984 9.3668L12.0061 5.16599L18.9998 9.3648L19.0001 18H5.00007L4.99984 9.3668Z"
          fill="currentColor"
        />
        <path
          d="M9.50007 14C9.50007 13.4477 9.94778 13 10.5001 13H13.5001C14.0524 13 14.5001 13.4477 14.5001 14V20H9.50007V14Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

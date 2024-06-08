import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CardPlusFillIcon extends TapIcon {
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
          d="M20 4C21.0544 4 21.9182 4.81588 21.9945 5.85074L22 6V9H2V6C2 4.94564 2.81588 4.08183 3.85074 4.00549L4 4H20Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M22 11H2V18L2.00549 18.1493C2.08183 19.1841 2.94564 20 4 20H18V18H15V16H18V13H20V16H22V11ZM20 18H22C22 19.0544 21.1841 19.9182 20.1493 19.9945L20 20V18ZM5.99512 14H10.0166V16H5.99512V14Z"
          fill="currentColor"
        />
        <path d="M23 18V16H22V18H23Z" fill="currentColor" />
        <path d="M20 21V20H18V21H20Z" fill="currentColor" />
      </svg>
    `);
  }
}

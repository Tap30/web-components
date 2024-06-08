import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CardRightArrowFillIcon extends TapIcon {
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
          d="M2 11H22L22 16.9999L18.4645 13.4644L17.0503 14.8786L18.172 15.9994L13.9645 15.9999V17.9999L18.172 17.9994L17.0503 19.1212L17.9291 20H4C2.94564 20 2.08183 19.1841 2.00549 18.1493L2 18V11ZM18.9999 20H20L20.1493 19.9945C21.1841 19.9182 22 19.0544 22 18L22 16.9999L18.9999 20ZM10.0166 14H5.99512V16H10.0166V14Z"
          fill="currentColor"
        />
        <path
          d="M17.9291 20L18.4645 20.5354L18.9999 20H17.9291Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

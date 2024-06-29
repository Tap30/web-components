import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CardLeftArrowFillIcon extends TapIcon {
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
          d="M2 11H22V18L22 15.9999L17.7925 15.9994L18.9142 14.8786L17.5 13.4644L13.9645 16.9999L16.9646 20H4C2.94564 20 2.08183 19.1841 2.00549 18.1493L2 18V11ZM18.0354 20H20L20.1493 19.9945C21.1841 19.9182 22 19.0544 22 18L17.7925 17.9994L18.9142 19.1212L18.0354 20ZM10.0166 14H5.99512V16H10.0166V14Z"
          fill="currentColor"
        />
        <path
          d="M16.9646 20L17.5 20.5354L18.0354 20H16.9646Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

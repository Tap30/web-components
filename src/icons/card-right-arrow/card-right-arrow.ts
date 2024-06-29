import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CardRightArrowIcon extends TapIcon {
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
          d="M21.9945 5.85074C21.9182 4.81588 21.0544 4 20 4H4L3.85074 4.00549C2.81588 4.08183 2 4.94564 2 6V18L2.00549 18.1493C2.08183 19.1841 2.94564 20 4 20H12V18H4V11H20V13H22V6L21.9945 5.85074ZM4 6H20V9H4V6Z"
          fill="currentColor"
        />
        <path d="M10 15V13H6V15H10Z" fill="currentColor" />
        <path
          d="M17.0503 14.8786L18.4645 13.4644L22 16.9999L18.4645 20.5354L17.0503 19.1212L18.172 17.9994L13.9645 17.9999V15.9999L18.172 15.9994L17.0503 14.8786Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

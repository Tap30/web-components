import { html } from 'lit';
import { TapIcon } from '../../icon';

export class SpiralDotTwoIcon extends TapIcon {
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
          d="M5 9.25C5 7.17893 6.67893 5.5 8.75 5.5H14V7.5H8.75C7.7835 7.5 7 8.2835 7 9.25C7 10.2165 7.7835 11 8.75 11H15.25C17.3211 11 19 12.6789 19 14.75C19 16.6812 17.4586 18.5 15.25 18.5H10V16.5H15.25C16.2165 16.5 17 15.7165 17 14.75C17 13.7835 16.2165 13 15.25 13H8.75C6.54137 13 5 11.1812 5 9.25Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.5 6.5C19.5 7.4665 18.7165 8.25 17.75 8.25C16.7835 8.25 16 7.4665 16 6.5C16 5.5335 16.7835 4.75 17.75 4.75C18.7165 4.75 19.5 5.5335 19.5 6.5Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 17.5C8 18.4665 7.2165 19.25 6.25 19.25C5.2835 19.25 4.5 18.4665 4.5 17.5C4.5 16.5335 5.2835 15.75 6.25 15.75C7.2165 15.75 8 16.5335 8 17.5Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

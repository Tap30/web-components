import { html } from 'lit';
import { TapIcon } from '../../icon';

export class ClockSmallFillIcon extends TapIcon {
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
          d="M16.9497 7.05025C14.2161 4.31658 9.78392 4.31658 7.05025 7.05025C4.31658 9.78392 4.31658 14.2161 7.05025 16.9497C9.78392 19.6834 14.2161 19.6834 16.9497 16.9497C19.6834 14.2161 19.6834 9.78392 16.9497 7.05025ZM12.7 11.6254V8.5H11.3V12.3746L14.2941 14.3707L15.0707 13.2059L12.7 11.6254Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

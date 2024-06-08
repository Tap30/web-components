import { html } from 'lit';
import { TapIcon } from '../../icon';

export class HourglassIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1606)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.12747 13.6215C9.36975 13.2823 9.5 12.8759 9.5 12.4591V11.5409C9.5 11.1241 9.36975 10.7177 9.12747 10.3785L6.37253 6.52155C6.13025 6.18235 6 5.77592 6 5.35907V4C6 2.89543 6.89543 2 8 2H16C17.1046 2 18 2.89543 18 4V5.35907C18 5.77592 17.8698 6.18234 17.6275 6.52155L14.8725 10.3785C14.6302 10.7177 14.5 11.1241 14.5 11.5409V12.4591C14.5 12.8759 14.6302 13.2823 14.8725 13.6215L17.6275 17.4785C17.8698 17.8177 18 18.2241 18 18.6409V20C18 21.1046 17.1046 22 16 22L8 22C6.89543 22 6 21.1046 6 20V18.6409C6 18.2241 6.13025 17.8177 6.37253 17.4785L9.12747 13.6215ZM8 4H16V5.35907L13.2461 9.21447H10.7539L8 5.35907V4Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1606">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

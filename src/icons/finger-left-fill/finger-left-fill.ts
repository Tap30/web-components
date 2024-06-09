import { html } from 'lit';
import { TapIcon } from '../../icon';

export class FingerLeftFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_802)">
          <path
            d="M14.82 19.4801L19.28 18.8501C20.27 18.7101 21 17.8601 21 16.8701V10.7101C21 10.1801 20.79 9.42012 20.41 9.05012L15.62 4.50012L14.78 5.33012C14.54 5.57012 14.43 5.91012 14.5 6.25012L15.24 9.50012H4.5C3.67 9.50012 3 10.1701 3 11.0001C3 11.8301 3.67 12.5001 4.5 12.5001H10.5V13.4101C10.5 13.7201 10.57 14.0301 10.71 14.3001L12.75 18.3901C13.14 19.1601 13.97 19.6001 14.82 19.4801Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_802">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

import { html } from 'lit';
import { TapIcon } from '../../icon';

export class PowerIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_537)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.9991 2V13.0009H10.9991V2H12.9991Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.04986 5.63907L6.34275 6.34617C3.21933 9.4696 3.21933 14.534 6.34275 17.6574C9.46618 20.7809 14.5306 20.7809 17.654 17.6574C20.7774 14.534 20.7774 9.4696 17.654 6.34617L16.9469 5.63907L18.3611 4.22485L19.0682 4.93196C22.9727 8.83644 22.9727 15.1672 19.0682 19.0716C15.1637 22.9761 8.83301 22.9761 4.92854 19.0716C1.02406 15.1672 1.02406 8.83644 4.92854 4.93196L5.63565 4.22485L7.04986 5.63907Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_537">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

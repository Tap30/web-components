import { html } from 'lit';
import { TapIcon } from '../../icon';

export class SparkThreeFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_468)">
          <path
            d="M4.6751 8.12498L5.7501 5.62498L8.3501 4.47498L5.7501 3.34998L4.6751 0.974976L3.6001 3.34998L1.0001 4.47498L3.6001 5.62498L4.6751 8.12498ZM4.6751 23L5.7501 20.6L8.3501 19.475L5.7501 18.35L4.6751 15.825L3.6001 18.35L1.0001 19.475L3.6001 20.6L4.6751 23ZM15.6501 19.15L17.9501 14.225L22.9751 11.975L17.9501 9.72497L15.6501 4.82498L13.3251 9.72497L8.3251 11.975L13.3251 14.225L15.6501 19.15Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_468">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

import { html } from 'lit';
import { TapIcon } from '../../icon';

export class SparkThreeIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_465)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.35012 19.475L5.75012 20.6L4.67512 23L3.60012 20.6L1.00012 19.475L3.60012 18.35L4.67512 15.825L5.75012 18.35L8.35012 19.475ZM17.9501 9.72497L22.9751 11.975L17.9501 14.225L15.6501 19.15L13.3251 14.225L8.32512 11.975L13.3251 9.72497L15.6501 4.82498L17.9501 9.72497ZM15.6403 9.51106L16.4551 11.2469L18.0811 11.975L16.4531 12.7039L15.6403 14.4443L14.8187 12.7039L13.1988 11.975L14.8167 11.2469L15.6403 9.51106ZM1.00012 4.47498L3.60012 3.34998L4.67512 0.974976L5.75012 3.34998L8.35012 4.47498L5.75012 5.62498L4.67512 8.12498L3.60012 5.62498L1.00012 4.47498Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_465">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

import { html } from 'lit';
import { TapIcon } from '../../icon';

export class HelmetsFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1627)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.00195 16C2.00195 9.37258 7.37454 4 14.002 4C18.4202 4 22.002 7.58172 22.002 12C22.002 16.4183 18.4202 20 14.002 20H4.00195C2.89738 20 2.00195 19.1046 2.00195 18V16ZM10.5463 13.7129L4.45959 13.0004C5.0508 11.1178 6.18373 9.47511 7.67569 8.255L11.4552 9.43189C12.3737 9.71791 12.9994 10.5681 12.9994 11.5301C12.9994 12.8451 11.8523 13.8657 10.5463 13.7129Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1627">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

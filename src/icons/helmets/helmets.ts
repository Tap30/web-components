import { html } from 'lit';
import { TapIcon } from '../../icon';

export class HelmetsIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1624)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.00195 16C2.00195 9.37258 7.37454 4 14.002 4C18.4202 4 22.002 7.58172 22.002 12C22.002 16.4183 18.4202 20 14.002 20H4.00195C2.89738 20 2.00195 19.1046 2.00195 18V16ZM14.002 18H4.00195V16C4.00195 15.6625 4.01867 15.3289 4.05133 15H10.455C12.4125 15 13.9994 13.4131 13.9994 11.4556C13.9994 10.1347 13.2649 8.9234 12.0936 8.31275L9.60569 7.01569C10.9325 6.36521 12.4246 6 14.002 6C17.3157 6 20.002 8.68629 20.002 12C20.002 15.3137 17.3157 18 14.002 18ZM4.45975 13H10.455C11.308 13 11.9994 12.3086 11.9994 11.4556C11.9994 10.8801 11.6793 10.3523 11.169 10.0862L7.66828 8.2611C6.18009 9.48051 5.05 11.1207 4.45975 13Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1624">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

import {html} from "lit";
import {TapIcon} from "../../icon";

export class PersonMinusFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_24_1675)">
          <path d="M14 8C14 5.79 12.21 4 10 4C7.79 4 6 5.79 6 8C6 10.21 7.79 12 10 12C12.21 12 14 10.21 14 8ZM17 10V12H23V10H17ZM2 18V20H18V18C18 15.34 12.67 14 10 14C7.33 14 2 15.34 2 18Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_24_1675">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      `);
  }
}

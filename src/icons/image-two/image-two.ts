import {html} from "lit";
import {TapIcon} from "../../icon";

export class ImageTwoIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_24_1243)">
          <path d="M10.025 14H17.975C18.1917 14 18.3458 13.9083 18.4375 13.725C18.5292 13.5417 18.5083 13.3667 18.375 13.2L15.95 10.025C15.85 9.89167 15.7167 9.825 15.55 9.825C15.3833 9.825 15.25 9.89167 15.15 10.025L13.25 12.5L12.1 11C12 10.8667 11.8667 10.8 11.7 10.8C11.5333 10.8 11.4 10.8667 11.3 11L9.625 13.2C9.49167 13.3667 9.47083 13.5417 9.5625 13.725C9.65417 13.9083 9.80833 14 10.025 14ZM8 18C7.45 18 6.97917 17.8042 6.5875 17.4125C6.19583 17.0208 6 16.55 6 16V4C6 3.45 6.19583 2.97917 6.5875 2.5875C6.97917 2.19583 7.45 2 8 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V16C22 16.55 21.8042 17.0208 21.4125 17.4125C21.0208 17.8042 20.55 18 20 18H8ZM8 16H20V4H8V16ZM4 22C3.45 22 2.97917 21.8042 2.5875 21.4125C2.19583 21.0208 2 20.55 2 20V7C2 6.71667 2.09583 6.47917 2.2875 6.2875C2.47917 6.09583 2.71667 6 3 6C3.28333 6 3.52083 6.09583 3.7125 6.2875C3.90417 6.47917 4 6.71667 4 7V20H17C17.2833 20 17.5208 20.0958 17.7125 20.2875C17.9042 20.4792 18 20.7167 18 21C18 21.2833 17.9042 21.5208 17.7125 21.7125C17.5208 21.9042 17.2833 22 17 22H4Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_24_1243">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      `);
  }
}

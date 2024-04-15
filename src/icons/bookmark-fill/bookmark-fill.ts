import {html} from "lit";
import {TapIcon} from "../../icon";

export class BookmarkFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_24_244)">
          <path d="M5 21V5C5 4.45 5.19583 3.97917 5.5875 3.5875C5.97917 3.19583 6.45 3 7 3H17C17.55 3 18.0208 3.19583 18.4125 3.5875C18.8042 3.97917 19 4.45 19 5V21L12 18L5 21Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_24_244">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      `);
  }
}

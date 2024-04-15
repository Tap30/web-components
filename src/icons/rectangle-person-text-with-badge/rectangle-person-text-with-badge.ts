import {html} from "lit";
import {TapIcon} from "../../icon";

export class RectanglePersonTextWithBadgeIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_24_1704)">
          <path d="M4 22C3.45 22 2.97917 21.8042 2.5875 21.4125C2.19583 21.0208 2 20.55 2 20V9C2 8.45 2.19583 7.97917 2.5875 7.5875C2.97917 7.19583 3.45 7 4 7H9V4C9 3.45 9.19583 2.97917 9.5875 2.5875C9.97917 2.19583 10.45 2 11 2H13C13.55 2 14.0208 2.19583 14.4125 2.5875C14.8042 2.97917 15 3.45 15 4V7H20C20.55 7 21.0208 7.19583 21.4125 7.5875C21.8042 7.97917 22 8.45 22 9V20C22 20.55 21.8042 21.0208 21.4125 21.4125C21.0208 21.8042 20.55 22 20 22H4ZM4 20H20V9H15C15 9.55 14.8042 10.0208 14.4125 10.4125C14.0208 10.8042 13.55 11 13 11H11C10.45 11 9.97917 10.8042 9.5875 10.4125C9.19583 10.0208 9 9.55 9 9H4V20ZM6 18H12V17.55C12 17.2667 11.9208 17.0042 11.7625 16.7625C11.6042 16.5208 11.3833 16.3333 11.1 16.2C10.7667 16.05 10.4292 15.9375 10.0875 15.8625C9.74583 15.7875 9.38333 15.75 9 15.75C8.61667 15.75 8.25417 15.7875 7.9125 15.8625C7.57083 15.9375 7.23333 16.05 6.9 16.2C6.61667 16.3333 6.39583 16.5208 6.2375 16.7625C6.07917 17.0042 6 17.2667 6 17.55V18ZM14 16.5H18V15H14V16.5ZM9 15C9.41667 15 9.77083 14.8542 10.0625 14.5625C10.3542 14.2708 10.5 13.9167 10.5 13.5C10.5 13.0833 10.3542 12.7292 10.0625 12.4375C9.77083 12.1458 9.41667 12 9 12C8.58333 12 8.22917 12.1458 7.9375 12.4375C7.64583 12.7292 7.5 13.0833 7.5 13.5C7.5 13.9167 7.64583 14.2708 7.9375 14.5625C8.22917 14.8542 8.58333 15 9 15ZM14 13.5H18V12H14V13.5ZM11 9H13V4H11V9Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_24_1704">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      `);
  }
}

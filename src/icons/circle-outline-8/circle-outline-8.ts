import {html} from "lit";
import {TapIcon} from "../../icon";

export class CircleOutline8Icon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C7.02975 21 3 16.9703 3 12C3 7.02975 7.02975 3 12 3C16.9703 3 21 7.02975 21 12C21 16.9703 16.9703 21 12 21ZM12 1C5.9346 1 1 5.9346 1 12C1 18.0654 5.9346 23 12 23C18.0654 23 23 18.0654 23 12C23 5.9346 18.0654 1 12 1Z" fill="currentColor"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.74153 16.6418C10.0462 16.1451 10.3269 15.6682 10.5836 15.2112C10.8403 14.7541 11.0741 14.3023 11.2848 13.8557C11.4956 13.4091 11.6855 12.9625 11.8546 12.5159C12.0236 12.0692 12.1749 11.6059 12.3085 11.1259C12.4587 11.6894 12.6299 12.2425 12.8219 12.7851C13.0139 13.3277 13.2121 13.8379 13.4167 14.3159C13.6212 14.7938 13.8247 15.2289 14.0271 15.6212C14.2295 16.0136 14.4142 16.3433 14.5812 16.6105L15.896 15.7715C15.6998 15.471 15.4942 15.1047 15.2793 14.6727C15.0643 14.2407 14.8525 13.7712 14.6438 13.264C14.4351 12.7569 14.2358 12.2247 14.0459 11.6675C13.856 11.1103 13.6869 10.5541 13.5387 9.99898C13.3906 9.44385 13.2706 8.90333 13.1787 8.37742C13.0869 7.8515 13.0347 7.36524 13.0222 6.91863L11.3193 6.88733C11.3193 7.85568 11.2368 8.75516 11.072 9.58576C10.9071 10.4164 10.688 11.1948 10.4146 11.9211C10.1412 12.6473 9.83127 13.3298 9.48483 13.9684C9.1384 14.607 8.78362 15.2185 8.42049 15.8028L9.74153 16.6418Z" fill="currentColor"/>
      </svg>
      `);
  }
}

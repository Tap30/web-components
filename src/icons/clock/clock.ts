import {html} from "lit";
import {TapIcon} from "../../icon";

export class ClockIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM13 11.57V6.40002H11V12.3954L10.9985 12.3969L11 12.3984V12.4H11.0016L14.1258 15.5242L15.54 14.11L13 11.57Z" fill="currentColor"/>
      </svg>
      `);
  }
}
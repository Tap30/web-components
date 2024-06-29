import { html } from 'lit';
import { TapIcon } from '../../icon';

export class AlarmClockFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.9993 2.99997C16.9699 2.99997 20.9993 7.0294 20.9993 12C20.9993 16.9705 16.9699 21 11.9993 21C7.02874 21 2.99931 16.9705 2.99931 12C2.99931 7.0294 7.02874 2.99997 11.9993 2.99997ZM12.9993 7.99997H10.9993V14H15.9993V12H12.9993V7.99997ZM18.227 0.626953L22.0572 3.84089L20.7716 5.37298L16.9414 2.15904L18.227 0.626953ZM5.77163 0.626953L7.0572 2.15904L3.22698 5.37298L1.94141 3.84089L5.77163 0.626953Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CrossIcon extends TapIcon {
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
          d="M17.6575 7.75735L13.4148 12L17.6575 16.2426L16.2432 17.6568L12.0006 13.4142L7.75796 17.6568L6.34375 16.2426L10.5864 12L6.34375 7.75735L7.75796 6.34314L12.0006 10.5858L16.2432 6.34314L17.6575 7.75735Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CircleCheckSmallFillIcon extends TapIcon {
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
          d="M12 4C16.416 4 20 7.584 20 12C20 16.416 16.416 20 12 20C7.584 20 4 16.416 4 12C4 7.584 7.584 4 12 4ZM15.4343 9.03438L11.2 13.2687L9.3657 11.4344L8.23433 12.5658L11.2 15.5314L16.5657 10.1657L15.4343 9.03438Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

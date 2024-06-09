import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CircleCheckSmallIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1352)">
          <path
            d="M11.2 15.5314L16.5657 10.1657L15.4343 9.03438L11.2 13.2687L9.3657 11.4344L8.23433 12.5657L11.2 15.5314Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 12C4 7.584 7.584 4 12 4C16.416 4 20 7.584 20 12C20 16.416 16.416 20 12 20C7.584 20 4 16.416 4 12ZM5.6 12C5.6 15.528 8.472 18.4 12 18.4C15.528 18.4 18.4 15.528 18.4 12C18.4 8.472 15.528 5.6 12 5.6C8.472 5.6 5.6 8.472 5.6 12Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1352">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

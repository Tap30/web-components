import { html } from 'lit';
import { TapIcon } from '../../icon';

export class StarFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1490)">
          <path
            d="M12.0003 17.27L16.1503 19.78C16.9103 20.24 17.8403 19.56 17.6403 18.7L16.5403 13.98L20.2103 10.8C20.8803 10.22 20.5203 9.12001 19.6403 9.05001L14.8103 8.64001L12.9203 4.18001C12.5803 3.37001 11.4203 3.37001 11.0803 4.18001L9.19032 8.63001L4.36032 9.04001C3.48032 9.11001 3.12032 10.21 3.79032 10.79L7.46032 13.97L6.36032 18.69C6.16032 19.55 7.09032 20.23 7.85032 19.77L12.0003 17.27Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1490">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

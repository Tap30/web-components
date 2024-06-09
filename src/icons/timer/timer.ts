import { html } from 'lit';
import { TapIcon } from '../../icon';

export class TimerIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1554)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15 1H9V3H15V1ZM11 14H13V8H11V14ZM19.03 7.39L20.45 5.97C20.02 5.46 19.55 4.98 19.04 4.56L17.62 5.98C16.0273 4.69833 14.0443 3.99969 12 4C9.61305 4 7.32387 4.94821 5.63604 6.63604C3.94821 8.32387 3 10.6131 3 13C3 17.97 7.02 22 12 22C13.6943 22.0009 15.3544 21.5232 16.7891 20.622C18.2238 19.7207 19.3748 18.4325 20.1094 16.9057C20.8441 15.379 21.1325 13.6758 20.9415 11.9923C20.7506 10.3087 20.088 8.71341 19.03 7.39ZM12 20C8.13 20 5 16.87 5 13C5 9.13 8.13 6 12 6C15.87 6 19 9.13 19 13C19 16.87 15.87 20 12 20Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1554">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

import { html } from 'lit';
import { TapIcon } from '../../icon';

export class LocationLeftIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1152)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.22891 10.1833C2.59036 10.8974 2.59036 13.1043 4.22892 13.8183L17.9928 19.8088C19.8781 20.6286 21.749 18.6493 20.6826 16.9632L17.5504 12.009L20.6903 7.03529C21.7542 5.34974 19.8847 3.37119 18.0003 4.19144L4.22891 10.1833Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1152">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

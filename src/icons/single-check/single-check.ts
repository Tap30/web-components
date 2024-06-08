import { html } from 'lit';
import { TapIcon } from '../../icon';

export class SingleCheckIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_868)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.49394 17.783L4 12.2893L5.10079 11.1885L9.49357 15.5813L19.7414 5.33337L20.8421 6.43414L9.49394 17.783Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_868">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

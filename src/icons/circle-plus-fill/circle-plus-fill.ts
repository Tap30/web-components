import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CirclePlusFillIcon extends TapIcon {
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
          d="M4.92893 4.92893C8.83418 1.02369 15.1658 1.02369 19.0711 4.92893C22.9763 8.83418 22.9763 15.1658 19.0711 19.0711C15.1658 22.9763 8.83418 22.9763 4.92893 19.0711C1.02369 15.1658 1.02369 8.83418 4.92893 4.92893ZM11 8H13L12.9998 11.0002L16 11V13L12.9998 12.9998L13 16H11L11.0002 12.9998L8 13V11L11.0002 11.0002L11 8Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

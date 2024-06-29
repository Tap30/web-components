import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CircleCrossFillIcon extends TapIcon {
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
          d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM14.1213 8.46447L15.5355 9.87868L13.414 12L15.5355 14.1213L14.1213 15.5355L12 13.414L9.87868 15.5355L8.46447 14.1213L10.586 12L8.46447 9.87868L9.87868 8.46447L12 10.586L14.1213 8.46447Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

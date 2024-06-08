import { html } from 'lit';
import { TapIcon } from '../../icon';

export class ArrowTopRightFillIcon extends TapIcon {
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
          d="M4.10534 11.2111L3.96033 11.2905C2.42328 12.2094 2.79512 14.5987 4.60753 14.9612L8.29977 15.7L9.0386 19.3922C9.41207 21.2596 11.937 21.5977 12.7886 19.8944L18.7886 7.89443C19.6482 6.17532 17.8244 4.35159 16.1053 5.21115L4.10534 11.2111Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

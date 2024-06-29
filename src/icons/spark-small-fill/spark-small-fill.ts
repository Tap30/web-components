import { html } from 'lit';
import { TapIcon } from '../../icon';

export class SparkSmallFillIcon extends TapIcon {
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
          d="M14.4689 9.78481L12.3195 5H11.6224L9.82158 9.66667L5 11.4979V12.2658L9.82158 14.2152L11.6224 19H12.4357L14.2365 14.2152L19 12.2658V11.4979L14.4689 9.78481Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

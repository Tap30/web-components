import { html } from 'lit';
import { TapIcon } from '../../icon';

export class SparkIcon extends TapIcon {
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
          d="M14.0167 10.3001L12.0399 6.66911L10.3114 10.1661L6.72429 11.9106L10.3276 13.7361L12.029 17.2504L13.7286 13.7402L17.3019 11.9116L14.0167 10.3001ZM21 11.4979V12.2658L15.2365 15.2152L12.4357 21H11.6224L8.82158 15.2152L3 12.2658V11.4979L8.82158 8.66667L11.6224 3H12.3195L15.4689 8.78481L21 11.4979Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

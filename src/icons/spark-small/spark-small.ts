import { html } from 'lit';
import { TapIcon } from '../../icon';

export class SparkSmallIcon extends TapIcon {
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
          d="M13.5685 10.6779L12.031 7.85375L10.6867 10.5736L7.89667 11.9305L10.6992 13.3503L12.0226 16.0836L13.3444 13.3535L16.1237 11.9312L13.5685 10.6779ZM19 11.6095V12.2068L14.5173 14.5007L12.3389 19H11.7063L9.52789 14.5007L5 12.2068V11.6095L9.52789 9.40741L11.7063 5H12.2485L14.698 9.4993L19 11.6095Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

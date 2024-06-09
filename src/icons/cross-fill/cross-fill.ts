import { html } from 'lit';
import { TapIcon } from '../../icon';

export class CrossFillIcon extends TapIcon {
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
          d="M12.0006 14.1213L15.1825 17.3033L17.3039 15.182L14.1219 12L17.3039 8.81804L15.1825 6.69672L12.0006 9.8787L8.81859 6.69672L6.69727 8.81804L9.87925 12L6.69727 15.182L8.81859 17.3033L12.0006 14.1213Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

import { html } from 'lit';
import { TapIcon } from '../../icon';

export class SquareOutline1Icon extends TapIcon {
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
          d="M13.52 16.6261V17.3565H11.76C11.76 16.7629 11.7565 16.1589 11.7495 15.5444C11.7426 14.9299 11.7252 14.3223 11.6974 13.7218C11.6695 13.1212 11.629 12.531 11.5756 11.9513C11.5223 11.3716 11.4481 10.8186 11.353 10.2922C11.258 9.76581 11.1397 9.27074 10.9982 8.80697C10.8568 8.3432 10.684 7.92349 10.48 7.54784L11.9478 6.64349C12.1611 6.97277 12.3385 7.32871 12.48 7.71132C12.6214 8.09393 12.7432 8.49741 12.8452 8.92175C12.9472 9.3461 13.033 9.789 13.1026 10.2505C13.1722 10.7119 13.2394 11.1815 13.3043 11.6591C13.3507 12.0209 13.3878 12.4139 13.4156 12.8383C13.4435 13.2626 13.4655 13.6939 13.4817 14.1322C13.498 14.5704 13.5084 15.0029 13.513 15.4296C13.5177 15.8562 13.52 16.2551 13.52 16.6261Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1 5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5ZM5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

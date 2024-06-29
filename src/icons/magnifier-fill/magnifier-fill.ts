import { html } from 'lit';
import { TapIcon } from '../../icon';

export class MagnifierFillIcon extends TapIcon {
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
          d="M19.5 10.5C19.5 12.3141 18.9628 14.004 18.0388 15.4177L22.3891 19.7678L20.2678 21.8891L16.0017 17.6231C14.4806 18.7996 12.5716 19.5 10.5 19.5C5.52944 19.5 1.5 15.4706 1.5 10.5C1.5 5.52944 5.52944 1.5 10.5 1.5C15.4706 1.5 19.5 5.52944 19.5 10.5ZM4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 13.8137 13.8137 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

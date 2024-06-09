import { html } from 'lit';
import { TapIcon } from '../../icon';

export class SliderHorizontalIcon extends TapIcon {
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
          d="M8.5 13.5C10.433 13.5 12 15.067 12 17C12 18.933 10.433 20.5 8.5 20.5C6.9148 20.5 5.57573 19.4462 5.14519 18.0008L2 18V16L5.14489 16.0002C5.57511 14.5543 6.91443 13.5 8.5 13.5ZM8.5 15.5C7.67157 15.5 7 16.1716 7 17C7 17.8284 7.67157 18.5 8.5 18.5C9.32843 18.5 10 17.8284 10 17C10 16.1716 9.32843 15.5 8.5 15.5ZM22 16V18H14V16H22ZM15.5 3.5C17.0856 3.5 18.4249 4.55433 18.8551 6.00016L22 6V8L18.8548 8.00084C18.4243 9.44615 17.0852 10.5 15.5 10.5C13.567 10.5 12 8.933 12 7C12 5.067 13.567 3.5 15.5 3.5ZM15.5 5.5C14.6716 5.5 14 6.17157 14 7C14 7.82843 14.6716 8.5 15.5 8.5C16.3284 8.5 17 7.82843 17 7C17 6.17157 16.3284 5.5 15.5 5.5ZM10 6V8H2V6H10Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

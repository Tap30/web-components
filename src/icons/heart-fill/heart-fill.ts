import { html } from 'lit';
import { TapIcon } from '../../icon';

export class HeartFillIcon extends TapIcon {
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
          d="M20.8388 5.63609C22.927 7.72431 22.985 11.0739 21.0128 13.2322L20.8388 13.4143L12 22.2531L3.16114 13.4142C1.01326 11.2664 1.01326 7.78394 3.16114 5.63606C5.24936 3.54784 8.599 3.48983 10.7573 5.46204L10.9393 5.63606L11.9992 6.69515L13.0606 5.63609C15.2085 3.48821 18.6909 3.48821 20.8388 5.63609Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

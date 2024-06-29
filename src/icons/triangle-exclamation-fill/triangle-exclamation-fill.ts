import { html } from 'lit';
import { TapIcon } from '../../icon';

export class TriangleExclamationFillIcon extends TapIcon {
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
          d="M14.2603 5.09648L14.3686 5.24257L21.4919 15.5147C21.8229 15.9919 22 16.5572 22 17.1362C22 18.6613 20.7964 19.908 19.2788 19.9951L19.1089 20H4.89137C4.3088 20 3.73981 19.8257 3.25898 19.4998C1.99183 18.6411 1.63108 16.9604 2.40668 15.6718L2.50522 15.5192L9.59938 5.2471C9.76043 5.01391 9.9552 4.80593 10.1771 4.62968L10.3486 4.50355L10.5025 4.40565C11.7498 3.66573 13.3641 3.96249 14.2603 5.09648ZM12.9662 14.8628H10.9724V16.8378H12.9662V14.8628ZM12.9662 8.44386H10.9724V12.8877H12.9662V8.44386Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

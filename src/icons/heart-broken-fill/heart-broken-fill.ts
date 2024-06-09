import { html } from 'lit';
import { TapIcon } from '../../icon';

export class HeartBrokenFillIcon extends TapIcon {
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
          d="M11.8322 6.52815L10.9394 5.63606L10.7574 5.46204C8.59906 3.48983 5.24943 3.54784 3.16121 5.63606C1.01332 7.78394 1.01332 11.2664 3.16121 13.4142L9.97194 20.225L10.0024 15.6351L12.1983 13L9.78723 10.1068L11.8322 6.52815Z"
          fill="currentColor"
        />
        <path
          d="M11.9588 22.2118L12 22.2531L20.8389 13.4143L21.0129 13.2322C22.9851 11.0739 22.9271 7.72431 20.8389 5.63609C19.3788 4.17599 17.302 3.70844 15.4469 4.23346L12.2127 9.8933L14.8017 13L11.9976 16.365L11.9588 22.2118Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

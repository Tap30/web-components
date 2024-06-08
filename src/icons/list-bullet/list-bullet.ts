import { html } from 'lit';
import { TapIcon } from '../../icon';

export class ListBulletIcon extends TapIcon {
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
          d="M19.5 4.5C18.6716 4.5 18 5.17157 18 6C18 6.82843 18.6716 7.5 19.5 7.5C20.3284 7.5 21 6.82843 21 6C21 5.17157 20.3284 4.5 19.5 4.5Z"
          fill="currentColor"
        />
        <path d="M15.5 5H3V7H15.5V5Z" fill="currentColor" />
        <path
          d="M18 12C18 11.1716 18.6716 10.5 19.5 10.5C20.3284 10.5 21 11.1716 21 12C21 12.8284 20.3284 13.5 19.5 13.5C18.6716 13.5 18 12.8284 18 12Z"
          fill="currentColor"
        />
        <path
          d="M19.5 16.5C18.6716 16.5 18 17.1716 18 18C18 18.8284 18.6716 19.5 19.5 19.5C20.3284 19.5 21 18.8284 21 18C21 17.1716 20.3284 16.5 19.5 16.5Z"
          fill="currentColor"
        />
        <path d="M3 11H15.5V13H3V11Z" fill="currentColor" />
        <path d="M15.5 17H3V19H15.5V17Z" fill="currentColor" />
      </svg>
    `);
  }
}

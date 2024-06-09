import { html } from 'lit';
import { TapIcon } from '../../icon';

export class Person1Icon extends TapIcon {
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
          d="M9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7ZM12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.5 16H7.5C6.39543 16 5.5 16.8954 5.5 18C5.5 19.1046 6.39543 20 7.5 20H16.5C17.6046 20 18.5 19.1046 18.5 18C18.5 16.8954 17.6046 16 16.5 16ZM7.5 14C5.29086 14 3.5 15.7909 3.5 18C3.5 20.2091 5.29086 22 7.5 22H16.5C18.7091 22 20.5 20.2091 20.5 18C20.5 15.7909 18.7091 14 16.5 14H7.5Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

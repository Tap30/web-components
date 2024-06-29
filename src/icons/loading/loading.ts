import { html } from 'lit';
import { TapIcon } from '../../icon';

export class LoadingIcon extends TapIcon {
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
          opacity="0.12"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          fill="currentColor"
        />
        <path
          d="M12 5C15.866 5 19 8.13401 19 12C19 13.933 18.2165 15.683 16.9498 16.9497L19.0711 19.0711C20.8807 17.2614 22 14.7614 22 12C22 6.47715 17.5229 2 12 2V5Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

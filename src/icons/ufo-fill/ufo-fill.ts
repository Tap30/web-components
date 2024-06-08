import { html } from 'lit';
import { TapIcon } from '../../icon';

export class UfoFillIcon extends TapIcon {
  render() {
    return this.renderIcon(html`
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_24_1537)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13 22V19H11V22H13ZM8 20V17H6V20H8ZM18 20V17H16V20H18Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.6917 3.36659C14.6639 2.48464 13.3543 1.99985 12 2C10.6458 2.00026 9.3364 2.4852 8.3087 3.36708C7.28101 4.24896 6.60288 5.46954 6.397 6.808C3.756 7.663 2 9.145 2 11C2 13.983 6.538 16 12 16C17.462 16 22 13.983 22 11C22 9.145 20.244 7.663 17.603 6.808C17.3975 5.46936 16.7195 4.24855 15.6917 3.36659ZM17.334 9.008L17.411 8.86C17.1877 8.46233 16.5262 7.667 15.667 7.667C15.67 8.398 14.29 9 12 9C9.696 9 8.328 8.406 8.333 7.674C7.3994 7.8132 6.77733 8.52467 6.583 8.863C7.275 10.327 9.34 11 12 11C14.55 11 16.568 10.368 17.334 9.008Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_1537">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    `);
  }
}

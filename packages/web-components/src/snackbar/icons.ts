import { html, type TemplateResult } from "lit";

export const close: TemplateResult = html`
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    aria-hidden="true"
    fill="currentColor"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.1568 7.75735L13.9142 12L18.1568 16.2426L16.7426 17.6568L12.5 13.4142L8.25735 17.6568L6.84314 16.2426L11.0858 12L6.84314 7.75735L8.25735 6.34314L12.5 10.5858L16.7426 6.34314L18.1568 7.75735Z"
    />
  </svg>
`;

export const success: TemplateResult = html`
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    aria-hidden="true"
    fill="currentColor"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.5 2C18.02 2 22.5 6.48 22.5 12C22.5 17.52 18.02 22 12.5 22C6.98 22 2.5 17.52 2.5 12C2.5 6.48 6.98 2 12.5 2ZM16.7929 8.29297L11.5 13.5859L9.20712 11.293L7.79291 12.7072L11.5 16.4143L18.2071 9.70718L16.7929 8.29297Z"
    />
  </svg>
`;

export const error: TemplateResult = html`
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    aria-hidden="true"
    fill="currentColor"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.5 22C18.02 22 22.5 17.52 22.5 12C22.5 6.48 18.02 2 12.5 2C6.98 2 2.5 6.48 2.5 12C2.5 17.52 6.98 22 12.5 22ZM11.5 7H13.5V13H11.5V7ZM11.5 15H13.5V17H11.5V15Z"
    />
  </svg>
`;

export const info: TemplateResult = html`
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    aria-hidden="true"
    fill="currentColor"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM11 17H13V11H11V17ZM11 9H13V7H11V9Z"
    />
  </svg>
`;

export const warning: TemplateResult = html`
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    aria-hidden="true"
    fill="currentColor"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.2603 5.09648L14.3686 5.24257L21.4919 15.5147C21.8229 15.9919 22 16.5572 22 17.1362C22 18.6613 20.7964 19.908 19.2788 19.9951L19.1089 20H4.89137C4.3088 20 3.73981 19.8257 3.25898 19.4998C1.99183 18.6411 1.63108 16.9604 2.40668 15.6718L2.50522 15.5192L9.59938 5.2471C9.76043 5.01391 9.9552 4.80593 10.1771 4.62968L10.3486 4.50355L10.5025 4.40565C11.7498 3.66573 13.3641 3.96249 14.2603 5.09648ZM12.9662 14.8628H10.9724V16.8378H12.9662V14.8628ZM12.9662 8.44386H10.9724V12.8877H12.9662V8.44386Z"
    />
  </svg>
`;

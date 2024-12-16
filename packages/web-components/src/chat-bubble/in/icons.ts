import { html } from "lit";

export const seen = html`
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.4834 6.48413L15.5841 7.5849L6.82708 16.4496L2.86816 12.6216L3.96895 11.5208L6.82671 14.2479L14.4834 6.48413ZM18.9746 6.48413L20.0753 7.5849L11.3183 16.4496L10.2549 15.3717L11.3179 14.2479L18.9746 6.48413Z"
    />
  </svg>
`;

export const sent = html`
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="m9.49394 17.783-5.49394-5.4937 1.10079-1.1008 4.39278 4.3928 10.24783-10.24793 1.1007 1.10077z"
    />
  </svg>
`;

export const pending = html`
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 17.4444C15.0069 17.4444 17.4444 15.0069 17.4444 12C17.4444 8.99312 15.0069 6.55556 12 6.55556C8.99312 6.55556 6.55556 8.99312 6.55556 12C6.55556 15.0069 8.99312 17.4444 12 17.4444ZM12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12.7778 11.6658V7.64475H11.2222V12.3079L11.2211 12.309L11.2222 12.3102V12.3114H11.2235L13.6534 14.7413L14.7533 13.6414L12.7778 11.6658Z"
    />
  </svg>
`;

export const failed = html`
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z"
    />
  </svg>
`;

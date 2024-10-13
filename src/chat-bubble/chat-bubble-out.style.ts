import { css, unsafeCSS } from "lit";
import { BASENAME } from "./constants";

const ROOT = unsafeCSS(BASENAME);

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host([avatar-src]) {
    --chat-bubble-out-leading-space: 0;
  }

  :host(:not([avatar-src])) {
    --chat-bubble-out-leading-space: var(--tap-sys-spacing-11);
  }

  .${ROOT} {
    display: flex;
    flex-direction: row-reverse;
  }

  .${ROOT} tap-chat-bubble-base {
    margin-left: var(--chat-bubble-out-leading-space);
  }

  .${ROOT}__avatar {
    margin-right: var(--tap-sys-spacing-4);
    margin-left: var(--tap-sys-spacing-4);
  }
`;

export default styles;

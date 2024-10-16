import { css } from "lit";

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

  .root {
    display: flex;
    flex-direction: row-reverse;
  }

  .root tap-chat-bubble-base {
    margin-left: var(--chat-bubble-out-leading-space);
  }

  .avatar {
    margin-right: var(--tap-sys-spacing-4);
    margin-left: var(--tap-sys-spacing-4);
  }
`;

export default styles;

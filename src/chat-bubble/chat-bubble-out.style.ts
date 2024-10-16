import { css } from "lit";

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .root {
    --chat-bubble-out-leading-space: var(--tap-sys-spacing-11);

    display: flex;
    flex-direction: row-reverse;
  }

  .root.has-avatar {
    --chat-bubble-out-leading-space: 0;
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

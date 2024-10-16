import { css } from "lit";

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .root {
    --chat-bubble-in-icon-color: currentColor;

    display: flex;
  }

  .root.seen {
    --chat-bubble-in-icon-color: var(--tap-sys-color-content-accent);
  }

  .root:not(.failed) tap-chat-bubble-base {
    margin-right: var(--tap-sys-spacing-4);
  }

  .failure-indicator {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 24px;
    height: 24px;

    margin-right: var(--tap-sys-spacing-4);
    margin-left: var(--tap-sys-spacing-4);

    fill: var(--tap-sys-color-content-negative);
  }

  .status {
    display: flex;
    align-items: center;

    gap: var(--tap-sys-spacing-3);
  }

  .status > svg {
    width: 18px;
    height: 18px;

    fill: var(--chat-bubble-in-icon-color);
  }
`;

export default styles;

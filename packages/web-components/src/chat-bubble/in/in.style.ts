import { css } from "lit";

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    --chat-bubble-in-icon-color: currentColor;
  }

  .root.seen {
    --chat-bubble-in-icon-color: var(--tap-sys-color-content-on-inverse);
  }

  .root:not(.failed) .content {
    margin-right: var(--tap-sys-spacing-4);
  }

  .failure-indicator {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.5rem;
    height: 1.5rem;

    margin-right: var(--tap-sys-spacing-4);
    margin-left: var(--tap-sys-spacing-4);
    margin-top: auto;

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

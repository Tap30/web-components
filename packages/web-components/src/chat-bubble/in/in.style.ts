import { css, type CSSResult } from "lit";

const styles: CSSResult = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    --chat-bubble-in-icon-color: currentColor;
  }

  .root.seen {
    --chat-bubble-in-icon-color: var(--tapsi-color-content-on-inverse);
  }

  .root:not(.failed) .content {
    margin-right: var(--tapsi-spacing-4);
  }

  .failure-indicator {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.5rem;
    height: 1.5rem;

    margin-right: var(--tapsi-spacing-4);
    margin-left: var(--tapsi-spacing-4);
    margin-top: auto;

    fill: var(--tapsi-color-content-negative);
  }

  .status {
    display: flex;
    align-items: center;

    gap: var(--tapsi-spacing-3);
  }

  .status > svg {
    width: 18px;
    height: 18px;

    fill: var(--chat-bubble-in-icon-color);
  }
`;

export default styles;

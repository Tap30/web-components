import { css } from "lit";

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    display: block;
  }

  .root.fully-rounded {
    --chat-bubble-content-radius: var(--tap-sys-radius-5);
  }

  .root:not(.fully-rounded).in {
    --chat-bubble-content-radius: var(--tap-sys-radius-5)
      var(--tap-sys-radius-5) var(--tap-sys-radius-1) var(--tap-sys-radius-5);
  }

  .root:not(.fully-rounded).out {
    --chat-bubble-content-radius: var(--tap-sys-radius-5)
      var(--tap-sys-radius-5) var(--tap-sys-radius-5) var(--tap-sys-radius-1);
  }

  .root.in {
    --chat-bubble-content-bg-color: var(
      --tap-sys-color-surface-inverse-secondary
    );
    --chat-bubble-color: var(--tap-sys-color-content-on-inverse);
    --chat-bubble-footer-color: var(--tap-sys-color-content-disabled);
    --chat-bubble-footer-flex-direction: row;
  }

  .root.out {
    --chat-bubble-content-bg-color: var(--tap-sys-color-surface-secondary);
    --chat-bubble-color: var(--tap-sys-color-content-primary);
    --chat-bubble-footer-color: var(--chat-bubble-content-color);
    --chat-bubble-footer-flex-direction: row-reverse;
  }

  .root {
    display: flex;
  }

  .content {
    display: flex;
    flex-direction: column;

    gap: var(--tap-sys-spacing-2);
    padding: var(--tap-sys-spacing-3) var(--tap-sys-spacing-6);
    border-radius: var(--chat-bubble-content-radius);

    background-color: var(--chat-bubble-content-bg-color);

    min-width: 6rem;
    max-width: 17rem;
  }

  .body {
    font-family: var(--tap-sys-typography-body-sm-font);
    font-size: var(--tap-sys-typography-body-sm-size);
    line-height: var(--tap-sys-typography-body-sm-height);
    font-weight: var(--tap-sys-typography-body-sm-weight);

    color: var(--chat-bubble-color);
  }

  .footer {
    font-family: var(--tap-sys-typography-body-xs-font);
    font-size: var(--tap-sys-typography-body-xs-size);
    line-height: var(--tap-sys-typography-body-xs-height);
    font-weight: var(--tap-sys-typography-body-xs-weight);

    color: var(--chat-bubble-footer-color);

    display: flex;
    flex-direction: var(--chat-bubble-footer-flex-direction);

    gap: var(--tap-sys-spacing-3);
  }
`;

export default styles;

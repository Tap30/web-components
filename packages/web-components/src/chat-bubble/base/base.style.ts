import { css, type CSSResult } from "lit";

const styles: CSSResult = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    display: block;
  }

  .root.fully-rounded {
    --chat-bubble-content-radius: var(--tapsi-radius-5);
  }

  .root:not(.fully-rounded).in {
    --chat-bubble-content-radius: var(--tapsi-radius-5) var(--tapsi-radius-5)
      var(--tapsi-radius-1) var(--tapsi-radius-5);
  }

  .root:not(.fully-rounded).out {
    --chat-bubble-content-radius: var(--tapsi-radius-5) var(--tapsi-radius-5)
      var(--tapsi-radius-5) var(--tapsi-radius-1);
  }

  .root.in {
    --chat-bubble-content-bg-color: var(
      --tapsi-color-surface-inverse-secondary
    );
    --chat-bubble-color: var(--tapsi-color-content-on-inverse);
    --chat-bubble-footer-color: var(--tapsi-color-content-disabled);
    --chat-bubble-footer-flex-direction: row;
  }

  .root.out {
    --chat-bubble-content-bg-color: var(--tapsi-color-surface-secondary);
    --chat-bubble-color: var(--tapsi-color-content-primary);
    --chat-bubble-footer-color: var(--chat-bubble-content-color);
    --chat-bubble-footer-flex-direction: row-reverse;
  }

  .root {
    display: flex;
  }

  .content {
    display: flex;
    flex-direction: column;

    gap: var(--tapsi-spacing-2);
    padding: var(--tapsi-spacing-3) var(--tapsi-spacing-6);
    border-radius: var(--chat-bubble-content-radius);

    background-color: var(--chat-bubble-content-bg-color);

    min-width: 6rem;
    max-width: 17rem;
  }

  .body {
    font-family: var(--tapsi-typography-body-sm-font);
    font-size: var(--tapsi-typography-body-sm-size);
    line-height: var(--tapsi-typography-body-sm-height);
    font-weight: var(--tapsi-typography-body-sm-weight);

    color: var(--chat-bubble-color);
  }

  .footer {
    font-family: var(--tapsi-typography-body-xs-font);
    font-size: var(--tapsi-typography-body-xs-size);
    line-height: var(--tapsi-typography-body-xs-height);
    font-weight: var(--tapsi-typography-body-xs-weight);

    color: var(--chat-bubble-footer-color);

    display: flex;
    flex-direction: var(--chat-bubble-footer-flex-direction);

    gap: var(--tapsi-spacing-3);
  }
`;

export default styles;

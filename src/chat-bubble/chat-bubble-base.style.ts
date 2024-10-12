import { css, unsafeCSS } from "lit";
import { BASE_BASENAME } from "./constants";

const ROOT = unsafeCSS(BASE_BASENAME);

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host([fully-rounded]) {
    --chat-bubble-base-radius: var(--tap-sys-radius-5);
  }

  :host([author="passenger"]) {
    --chat-bubble-base-bg-color: var(--tap-sys-color-surface-tertiary);
    --chat-bubble-base-color: var(--tap-sys-color-content-primary);
    --chat-bubble-base-footer-color: var(--tap-sys-color-content-tertiary);
    --chat-bubble-base-footer-flex-direction: row;
  }

  :host([author="driver"]) {
    --chat-bubble-base-bg-color: var(--tap-sys-color-surface-accent);
    --chat-bubble-base-color: var(--tap-sys-color-content-on-accent);
    --chat-bubble-base-footer-color: var(--chat-bubble-base-color);
    --chat-bubble-base-footer-flex-direction: row-reverse;
  }

  :host(:not([fully-rounded])[author="passenger"]) {
    --chat-bubble-base-radius: var(--tap-sys-radius-5) var(--tap-sys-radius-1)
      var(--tap-sys-radius-5) var(--tap-sys-radius-5);
  }

  :host(:not([fully-rounded])[author="driver"]) {
    --chat-bubble-base-radius: var(--tap-sys-radius-1) var(--tap-sys-radius-5)
      var(--tap-sys-radius-5) var(--tap-sys-radius-5);
  }

  .${ROOT} {
    display: flex;
    flex-direction: column;

    gap: var(--tap-sys-spacing-2);
    padding: var(--tap-sys-spacing-3) var(--tap-sys-spacing-6);
    border-radius: var(--chat-bubble-base-radius);

    background-color: var(--chat-bubble-base-bg-color);

    min-width: 6rem;
    max-width: 17rem;
  }

  .${ROOT}__body {
    font-family: var(--tap-sys-typography-body-sm-font);
    font-size: var(--tap-sys-typography-body-sm-size);
    line-height: var(--tap-sys-typography-body-sm-height);
    font-weight: var(--tap-sys-typography-body-sm-weight);

    color: var(--chat-bubble-base-color);
  }

  .${ROOT}__footer {
    font-family: var(--tap-sys-typography-body-xs-font);
    font-size: var(--tap-sys-typography-body-xs-size);
    line-height: var(--tap-sys-typography-body-xs-height);
    font-weight: var(--tap-sys-typography-body-xs-weight);

    color: var(--chat-bubble-base-footer-color);

    display: flex;
    flex-direction: var(--chat-bubble-base-footer-flex-direction);

    gap: var(--tap-sys-spacing-3);
  }
`;

export default styles;

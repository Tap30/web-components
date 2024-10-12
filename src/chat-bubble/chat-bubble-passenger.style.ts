import { css, unsafeCSS } from "lit";
import { BASENAME } from "./constants";

const ROOT = unsafeCSS(BASENAME);

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host([status="seen"]) {
    --chat-bubble-passenger-icon-color: var(--tap-sys-color-content-accent);
  }

  :host(:not([status="seen"])) {
    --chat-bubble-passenger-icon-color: currentColor;
  }

  :host(:not([status="failed"])) tap-chat-bubble-base {
    margin-right: var(--tap-sys-spacing-4);
  }

  .${ROOT} {
    display: flex;
  }

  .${ROOT}__failure-indicator {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 24px;
    height: 24px;

    margin-right: var(--tap-sys-spacing-4);
    margin-left: var(--tap-sys-spacing-4);

    fill: var(--tap-sys-color-content-negative);
  }

  .${ROOT}__status {
    display: flex;
    align-items: center;

    gap: var(--tap-sys-spacing-3);
  }

  .${ROOT}__status > svg {
    width: 18px;
    height: 18px;

    fill: var(--chat-bubble-passenger-icon-color);
  }
`;

export default styles;

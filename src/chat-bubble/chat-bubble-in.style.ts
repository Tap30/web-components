import { css, unsafeCSS } from "lit";
import { InParts } from "./constants";

const root = unsafeCSS(InParts.ROOT);
const status = unsafeCSS(InParts.STATUS);
const failureIndicator = unsafeCSS(InParts.FAILURE_INDICATOR);

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host([status="seen"]) {
    --chat-bubble-in-icon-color: var(--tap-sys-color-content-accent);
  }

  :host(:not([status="seen"])) {
    --chat-bubble-in-icon-color: currentColor;
  }

  :host(:not([status="failed"])) tap-chat-bubble-base {
    margin-right: var(--tap-sys-spacing-4);
  }

  .${root} {
    display: flex;
  }

  .${failureIndicator} {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 24px;
    height: 24px;

    margin-right: var(--tap-sys-spacing-4);
    margin-left: var(--tap-sys-spacing-4);

    fill: var(--tap-sys-color-content-negative);
  }

  .${status} {
    display: flex;
    align-items: center;

    gap: var(--tap-sys-spacing-3);
  }

  .${status} > svg {
    width: 18px;
    height: 18px;

    fill: var(--chat-bubble-in-icon-color);
  }
`;

export default styles;

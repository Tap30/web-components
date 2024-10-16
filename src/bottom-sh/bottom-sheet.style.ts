import { css, unsafeCSS } from "lit";
import { Parts } from "./constants";

const root = unsafeCSS(Parts.ROOT);
const body = unsafeCSS(Parts.BODY);
const header = unsafeCSS(Parts.HEADER);
const overlay = unsafeCSS(Parts.OVERLAY);
const actionBar = unsafeCSS(Parts.ACTION_BAR);
const dismiss = unsafeCSS(Parts.DISMISS);
const dismissIcon = unsafeCSS(Parts.DISMISS_ICON);
const grabber = unsafeCSS(Parts.GRABBER);

const styles = css`
  .${root} {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    z-index: var(--tap-sys-z-5);
  }

  .${overlay} {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: -1;

    background-color: var(--tap-sys-color-surface-overlay-light);
  }

  .${header} {
    position: relative;

    display: flex;
    align-items: center;

    padding-left: var(--tap-sys-spacing-6);
    padding-right: var(--tap-sys-spacing-6);
    min-height: 52px;

    border-top-left-radius: var(--tap-sys-radius-5);
    border-top-right-radius: var(--tap-sys-radius-5);

    background-color: var(--tap-sys-color-surface-primary);
  }

  .${dismiss} {
  }

  .${dismissIcon} {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    vertical-align: middle;

    color: var(--tap-sys-color-content-primary);
  }

  .${dismissIcon} > svg {
    width: 20px;
    height: 20px;

    fill: currentColor;
  }

  .${grabber} {
    cursor: grab;
    height: 12px;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .${grabber}::after {
    content: "";
    display: block;

    width: 44px;
    height: 4px;

    border-radius: var(--tap-sys-radius-full);

    background-color: var(--tap-sys-color-surface-overlay-light);
  }

  .${body} {
  }

  .${actionBar} {
  }
`;

export default styles;

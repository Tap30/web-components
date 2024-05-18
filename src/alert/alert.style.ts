import { css } from "lit";
// TODO: fix

export default css`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }

  :host {
    display: inline-flex;
    user-select: none;
    text-overflow: ellipsis;
    place-content: center;
    place-items: center;
    position: relative;
  }

  .alert {
    position: relative;
    cursor: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    text-decoration: none;
    font: inherit;
    gap: var(--tap-sys-spacing-3);
    width: 100%;
    font-family: var(--tap-font-family, var(--tap-sys-font-family));
    border-radius: 999px;
    padding: var(--tap-alert-vertical-padding, var(--tap-sys-spacing-5)) var(--tap-alert-horizontal-padding, var(--tap-sys-spacing-5));
    background-color: var(--tap-alert-background-color-default, var(--tap-sys-color-surface-inverse-secondary));
    color: var(--tap-alert-color-default, var(--tap-sys-color-content-on-inverse));
  }

  :host .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([variant="success"]) .alert {
    background-color: var(--tap-alert-background-color-success, var(--tap-sys-color-surface-positive));
    color: var(--tap-alert-color-success, var(--tap-sys-color-content-on-inverse));
  }
  :host([variant="error"]) .alert {
    background-color: var(--tap-alert-background-color-error, var(--tap-sys-color-surface-negative));
    color: var(--tap-alert-color-error, var(--tap-sys-color-content-on-inverse));
  }
  :host([variant="info"]) .alert {
    background-color: var(--tap-alert-background-color-info, var(--tap-sys-color-surface-accent));
    color: var(--tap-alert-color-info, var(--tap-sys-color-content-on-inverse));
  }
  :host([variant="inverse"]) .alert {
    background-color: var(--tap-alert-background-color-inverse, var(--tap-sys-color-surface-inverse-secondary));
    color: var(--tap-alert-color-inverse, var(--tap-sys-color-content-on-inverse));
  }
  :host([variant="warning"]) .alert {
    background-color: var(--tap-alert-background-color-warning, var(--tap-sys-color-surface-warning));
    color: var(--tap-alert-color-warning, var(--tap-sys-color-content-primary));
  }

  :host(:not([show-dismiss-button])) .dismiss {
    display: none;
    color: inherit;
  }

  :host .dismiss {
    color: var(--tap-alert-dismiss-color, inherit);
    background: var(--tap-alert-dismiss-background-color, transparent);
    cursor: pointer;
    display: inline-flex;
    user-select: none;
    text-overflow: ellipsis;
    place-content: center;
    place-items: center;
    position: relative;
    border-radius: inherit;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    vertical-align: middle;
    text-decoration: none;
    font: inherit;
    gap: inherit;
  }
`;


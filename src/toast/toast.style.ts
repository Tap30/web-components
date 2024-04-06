import { css } from "lit";

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

  .toast {
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
    font-family: var(--tap-sys-font-family);
    border-radius: 999px;
    padding: var(--tap-sys-spacing-5) var(--tap-sys-spacing-5);
    animation: toast-animation 1s;
    background-color: var(--tap-sys-color-surface-inverse-secondary);
    color: var(--tap-sys-color-content-on-inverse);
  }

  :host .toast-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframe toast-animation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  :host([variant="success"]) .toast {
    background-color: var(--tap-sys-color-surface-positive);
    color: var(--tap-sys-color-content-on-inverse);
  }
  :host([variant="error"]) .toast {
    background-color: var(--tap-sys-color-surface-negative);
    color: var(--tap-sys-color-content-on-inverse);
  }
  :host([variant="info"]) .toast {
    background-color: var(--tap-sys-color-surface-accent);
    color: var(--tap-sys-color-content-on-inverse);
  }
  :host([variant="inverse"]) .toast {
    background-color: var(--tap-sys-color-surface-inverse-secondary);
    color: var(--tap-sys-color-content-on-inverse);
  }
  :host([variant="warning"]) .toast {
    background-color: var(--tap-sys-color-surface-warning);
    color: var(--tap-sys-color-content-primary);
  }

  :host(:not([showDismissButton])) .toast-dismiss {
    display: none;
    color: inherit;
  }

  :host .toast-dismiss {
    color: inherit;
    background: transparent;
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


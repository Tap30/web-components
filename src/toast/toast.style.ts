import { css } from 'lit';

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
    font-family: var(--tap-font-family, var(--tap-sys-font-family));
    border-radius: 999px;
    padding: var(--tap-toast-vertical-padding, var(--tap-sys-spacing-5))
      var(--tap-toast-horizontal-padding, var(--tap-sys-spacing-5));
    background-color: var(
      --tap-toast-background-color-default,
      var(--tap-sys-color-surface-inverse-secondary)
    );
    color: var(
      --tap-toast-color-default,
      var(--tap-sys-color-content-on-inverse)
    );
  }

  :host .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([variant='success']) .toast {
    background-color: var(
      --tap-toast-background-color-success,
      var(--tap-sys-color-surface-positive)
    );
    color: var(
      --tap-toast-color-success,
      var(--tap-sys-color-content-on-inverse)
    );
  }
  :host([variant='error']) .toast {
    background-color: var(
      --tap-toast-background-color-error,
      var(--tap-sys-color-surface-negative)
    );
    color: var(
      --tap-toast-color-error,
      var(--tap-sys-color-content-on-inverse)
    );
  }
  :host([variant='info']) .toast {
    background-color: var(
      --tap-toast-background-color-info,
      var(--tap-sys-color-surface-accent)
    );
    color: var(--tap-toast-color-info, var(--tap-sys-color-content-on-inverse));
  }
  :host([variant='inverse']) .toast {
    background-color: var(
      --tap-toast-background-color-inverse,
      var(--tap-sys-color-surface-inverse-secondary)
    );
    color: var(
      --tap-toast-color-inverse,
      var(--tap-sys-color-content-on-inverse)
    );
  }
  :host([variant='warning']) .toast {
    background-color: var(
      --tap-toast-background-color-warning,
      var(--tap-sys-color-surface-warning)
    );
    color: var(--tap-toast-color-warning, var(--tap-sys-color-content-primary));
  }

  :host(:not([show-dismiss-button])) .dismiss {
    display: none;
    color: inherit;
  }

  :host .dismiss {
    color: var(--tap-toast-dismiss-color, inherit);
    background: var(--tap-toast-dismiss-background-color, transparent);
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

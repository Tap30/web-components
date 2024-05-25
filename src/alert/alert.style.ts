import { css } from 'lit';
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
    /* alignment */
    position: relative;
    cursor: inherit;
    display: inline-flex;
    align-items: flex-start;
    justify-content: flex-start;
    vertical-align: middle;
    /* spacing and border */
    width: var(--tap-alert-width, 100%);
    gap: var(--tap-sys-spacing-5);
    border-radius: var(--tap-alert-radius, var(--tap-sys-radius-3));
    padding: var(--tap-alert-vertical-padding, var(--tap-sys-spacing-6))
      var(--tap-alert-horizontal-padding, var(--tap-sys-spacing-5));
    /* text and font */
    text-decoration: none;
    font: inherit;
    font-family: var(--tap-font-family, var(--tap-sys-font-family));
    /* default = inverse high */
    color: var(
      --tap-alert-color-inverse,
      var(--tap-sys-color-content-on-inverse)
    );
    background-color: var(
      --tap-alert-bg-color-inverse,
      var(--tap-sys-color-surface-inverse-primary)
    );
  }

  :host .text-root {
    margin: 0;
    padding: 0;
  }

  :host .title {
    display: block;
    font-size: var(
      --tap-alert-title-font-size,
      var(--tap-sys-typography-label-md-size)
    );
    line-height: var(
      --tap-alert-title-line-height,
      var(--tap-sys-typography-label-md-height)
    );
    font-weight: var(
      --tap-alert-title-font-weight,
      var(--tap-sys-typography-label-md-weight)
    );
  }

  :host .message {
    display: block;
    font-size: var(
      --tap-alert-message-font-size,
      var(--tap-sys-typography-body-sm-size)
    );
    line-height: var(
      --tap-alert-message-line-height,
      var(--tap-sys-typography-body-sm-height)
    );
    font-weight: var(
      --tap-alert-message-font-weight,
      var(--tap-sys-typography-body-sm-weight)
    );
  }

  :host .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([variant='inverse']) .alert {
    color: var(
      --tap-alert-color-inverse,
      var(--tap-sys-color-content-on-inverse)
    );
    background-color: var(
      --tap-alert-bg-color-inverse,
      var(--tap-sys-color-surface-inverse-primary)
    );
  }
  :host([variant='inverse'][priority='low']) .alert {
    color: var(
      --tap-alert-color-inverse-low,
      var(--tap-sys-color-content-primary)
    );
    background-color: var(
      --tap-alert-bg-color-inverse-low,
      var(--tap-sys-color-surface-primary)
    );
  }

  :host([variant='success']) .alert {
    color: var(
      --tap-alert-color-success,
      var(--tap-sys-color-content-on-inverse)
    );
    background-color: var(
      --tap-alert-bg-color-success,
      var(--tap-sys-color-surface-positive)
    );
  }
  :host([variant='success'][priority='low']) .alert {
    color: var(
      --tap-alert-color-success-low,
      var(--tap-sys-color-content-positive)
    );
    background-color: var(
      --tap-alert-bg-color-success-low,
      var(--tap-sys-color-surface-positive-light)
    );
  }
  :host([variant='warning']) .alert {
    color: var(--tap-alert-color-warning, var(--tap-sys-color-content-primary));
    background-color: var(
      --tap-alert-bg-color-warning,
      var(--tap-sys-color-surface-warning)
    );
  }
  :host([variant='warning'][priority='low']) .alert {
    color: var(
      --tap-alert-color-warning-low,
      var(--tap-sys-color-content-warning)
    );
    background-color: var(
      --tap-alert-bg-color-warning-low,
      var(--tap-sys-color-surface-warning-light)
    );
  }
  :host([variant='error']) .alert {
    color: var(
      --tap-alert-color-error,
      var(--tap-sys-color-content-on-inverse)
    );
    background-color: var(
      --tap-alert-bg-color-error,
      var(--tap-sys-color-surface-negative)
    );
  }
  :host([variant='error'][priority='low']) .alert {
    color: var(
      --tap-alert-color-error-low,
      var(--tap-sys-color-content-negative)
    );
    background-color: var(
      --tap-alert-bg-color-error-low,
      var(--tap-sys-color-surface-negative-light)
    );
  }
  :host([variant='info']) .alert {
    color: var(--tap-alert-color-info, var(--tap-sys-color-content-on-inverse));
    background-color: var(
      --tap-alert-bg-color-info,
      var(--tap-sys-color-surface-accent)
    );
  }
  :host([variant='info'][priority='low']) .alert {
    color: var(--tap-alert-color-info-low, var(--tap-sys-color-content-accent));
    background-color: var(
      --tap-alert-bg-color-info-low,
      var(--tap-sys-color-surface-accent-light)
    );
  }

  :host([priority='low']) .alert > p.text-root > span.message {
    color: var(
      --tap-alert-message-color-low,
      var(--tap-sys-color-content-secondary)
    );
  }
  :host([priority='low']) .alert > p.text-root > span.title {
    color: var(
      --tap-alert-title-color-low,
      var(--tap-sys-color-content-primary)
    );
  }
`;

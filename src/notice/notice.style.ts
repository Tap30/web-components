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

  .notice {
    /* alignment */
    position: relative;
    cursor: inherit;
    display: inline-flex;
    align-items: flex-start;
    justify-content: flex-start;
    vertical-align: middle;
    /* spacing and border */
    width: var(--tap-notice-width, 100%);
    gap: var(--tap-sys-spacing-5);
    border-radius: var(--tap-notice-radius, var(--tap-sys-radius-3));
    padding: var(--tap-notice-vertical-padding, var(--tap-sys-spacing-6))
      var(--tap-notice-horizontal-padding, var(--tap-sys-spacing-5));
    /* text and font */
    text-decoration: none;
    font: inherit;
    font-family: var(--tap-font-family, var(--tap-sys-font-family));
    /* default = inverse high */
    color: var(
      --tap-notice-color-inverse,
      var(--tap-sys-color-content-on-inverse)
    );
    background-color: var(
      --tap-notice-bg-color-inverse,
      var(--tap-sys-color-surface-inverse-primary)
    );
  }

  /* removing default margin of the div element*/
  :host .content-root {
    margin: 0;
    padding: 0;
  }

  /* removing default margin of the p element*/
  :host .content-root p {
    margin: 0;
    padding: 0;
  }

  :host .title {
    display: block;
    font-size: var(
      --tap-notice-title-font-size,
      var(--tap-sys-typography-label-md-size)
    );
    line-height: var(
      --tap-notice-title-line-height,
      var(--tap-sys-typography-label-md-height)
    );
    font-weight: var(
      --tap-notice-title-font-weight,
      var(--tap-sys-typography-label-md-weight)
    );
  }

  :host .message {
    display: block;
    font-size: var(
      --tap-notice-message-font-size,
      var(--tap-sys-typography-body-sm-size)
    );
    line-height: var(
      --tap-notice-message-line-height,
      var(--tap-sys-typography-body-sm-height)
    );
    font-weight: var(
      --tap-notice-message-font-weight,
      var(--tap-sys-typography-body-sm-weight)
    );
  }

  :host .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host .dismiss {
    background: transparent;
    border: none;
    padding: 0; /* set button padding to 0 because padding is already provided by flex gap */
    color: inherit;
  }
  :host .dismiss:hover {
    cursor: pointer;
  }

  /* actions section is the adjacent sibling of the message */
  :host .message + ::slotted(*) {
    margin-top: var(--tap-notice-actions-margin, var(--tap-sys-spacing-4));
  }

  :host([variant='inverse']) .notice {
    color: var(
      --tap-notice-color-inverse,
      var(--tap-sys-color-content-on-inverse)
    );
    background-color: var(
      --tap-notice-bg-color-inverse,
      var(--tap-sys-color-surface-inverse-primary)
    );
  }
  :host([variant='inverse'][priority='low']) .notice {
    color: var(
      --tap-notice-color-inverse-low,
      var(--tap-sys-color-content-primary)
    );
    background-color: var(
      --tap-notice-bg-color-inverse-low,
      var(--tap-sys-color-surface-primary)
    );
  }

  :host([variant='success']) .notice {
    color: var(
      --tap-notice-color-success,
      var(--tap-sys-color-content-on-inverse)
    );
    background-color: var(
      --tap-notice-bg-color-success,
      var(--tap-sys-color-surface-positive)
    );
  }
  :host([variant='success'][priority='low']) .notice {
    color: var(
      --tap-notice-color-success-low,
      var(--tap-sys-color-content-positive)
    );
    background-color: var(
      --tap-notice-bg-color-success-low,
      var(--tap-sys-color-surface-positive-light)
    );
  }
  :host([variant='warning']) .notice {
    color: var(
      --tap-notice-color-warning,
      var(--tap-sys-color-content-primary)
    );
    background-color: var(
      --tap-notice-bg-color-warning,
      var(--tap-sys-color-surface-warning)
    );
  }
  :host([variant='warning'][priority='low']) .notice {
    color: var(
      --tap-notice-color-warning-low,
      var(--tap-sys-color-content-warning)
    );
    background-color: var(
      --tap-notice-bg-color-warning-low,
      var(--tap-sys-color-surface-warning-light)
    );
  }
  :host([variant='error']) .notice {
    color: var(
      --tap-notice-color-error,
      var(--tap-sys-color-content-on-inverse)
    );
    background-color: var(
      --tap-notice-bg-color-error,
      var(--tap-sys-color-surface-negative)
    );
  }
  :host([variant='error'][priority='low']) .notice {
    color: var(
      --tap-notice-color-error-low,
      var(--tap-sys-color-content-negative)
    );
    background-color: var(
      --tap-notice-bg-color-error-low,
      var(--tap-sys-color-surface-negative-light)
    );
  }
  :host([variant='info']) .notice {
    color: var(
      --tap-notice-color-info,
      var(--tap-sys-color-content-on-inverse)
    );
    background-color: var(
      --tap-notice-bg-color-info,
      var(--tap-sys-color-surface-accent)
    );
  }
  :host([variant='info'][priority='low']) .notice {
    color: var(
      --tap-notice-color-info-low,
      var(--tap-sys-color-content-accent)
    );
    background-color: var(
      --tap-notice-bg-color-info-low,
      var(--tap-sys-color-surface-accent-light)
    );
  }

  /* text style of the "low priority" mode is selected by a higher-priority selector */
  /* without this higher priority selector, the texts would be the same color as the icons */
  :host([priority='low']) .notice > div.content-root > p.message {
    color: var(
      --tap-notice-message-color-low,
      var(--tap-sys-color-content-secondary)
    );
  }
  :host([priority='low']) .notice > button.dismiss {
    color: var(
      --tap-notice-message-color-low,
      var(--tap-sys-color-content-secondary)
    );
  }
  :host([priority='low']) .notice > div.content-root > p.title {
    color: var(
      --tap-notice-title-color-low,
      var(--tap-sys-color-content-primary)
    );
  }
`;

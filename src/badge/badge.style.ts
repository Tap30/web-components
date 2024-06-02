import { css } from 'lit';

export default css`
  .wrapper {
    position: relative;
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--tap-sys-spacing-2);
    font: inherit;
    font-family: var(--tap-font-family, --tap-sys-font-family);
    line-height: var(
      --tap-badge-line-height,
      --tap-sys-typography-body-xs-height
    );
    font-size: var(--tap-badge-font-size, --tap-sys-typography-body-xs-size);
    font-weight: var(
      --tap-badge-font-weight,
      --tap-sys-typography-body-xs-weight
    );
    color: var(--tap-badge-color, --tap-sys-color-content-primary);
    border-radius: var(--tap-badge-border-radius, --tap-sys-radius-4);
  }

  .icon {
    margin: var(--tap-badge-icon-margin, --tap-sys-spacing-2);
  }

  :host([type='pill']) .badge,
  :host([type='numeral']) .badge {
    border-radius: var(
      --tap-badge-pill-numeral-border-radius,
      --tap-sys-radius-4
    );
    padding: var(--tap-badge-pill-numeral-vertical-padding, --tap-sys-spacing-2)
      var(--tap-badge-pill-numeral-horizontal-padding, --tap-sys-spacing-4);
  }

  :host([type='dot']) .badge {
    /* FIXME: we dont have sizing tokens yet  */
    width: var(--tap-badge-dot-width, 6px);
    height: var(--tap-badge-dot-height, 6px);
    /* FIXME: use spacing tokens  */
    margin: var(--tap-badge-dot-margin, 3px);
    transform: translate(0, 0);
  }

  :host([variant='info']) .badge {
    background-color: var(
      --tap-badge-info-background-color,
      --tap-sys-color-surface-accent
    );
    color: var(--tap-badge-info-color, --tap-sys-color-content-on-negative);
  }

  :host([variant='success']) .badge {
    background-color: var(
      --tap-badge-success-background-color,
      --tap-sys-color-surface-positive
    );
    color: var(--tap-badge-success-color, --tap-sys-color-content-on-negative);
  }

  :host([variant='error']) .badge {
    background-color: var(
      --tap-badge-error-background-color,
      --tap-sys-color-surface-negative
    );
    color: var(--tap-badge-error-color, --tap-sys-color-content-on-negative);
  }

  :host([variant='warning']) .badge {
    background-color: var(
      --tap-badge-warning-background-color,
      --tap-sys-color-surface-warning
    );
    color: var(--tap-badge-warning-color, --tap-sys-color-content-on-warning);
  }

  :host([variant='inverse']) .badge {
    background-color: var(
      --tap-badge-inverse-background-color,
      --tap-sys-color-surface-disabled
    );
    color: var(--tap-badge-inverse-color, --tap-sys-color-content-tertiary);
  }

  :host([variant='info'][priority='low']) .badge {
    background-color: var(
      --tap-badge-info-low-background-color,
      --tap-sys-color-surface-accent-light
    );
    color: var(--tap-badge-info-low-color, --tap-sys-color-content-accent);
  }

  :host([variant='success'][priority='low']) .badge {
    background-color: var(
      --tap-badge-success-low-background-color,
      --tap-sys-color-surface-positive-light
    );
    color: var(--tap-badge-success-low-color, --tap-sys-color-content-positive);
  }

  :host([variant='error'][priority='low']) .badge {
    background-color: var(
      --tap-badge-error-low-background-color,
      --tap-sys-color-surface-negative-light
    );
    color: var(--tap-badge-error-low-color, --tap-sys-color-content-negative);
  }

  :host([variant='warning'][priority='low']) .badge {
    background-color: var(
      --tap-badge-warning-low-background-color,
      --tap-sys-color-surface-warning-light
    );
    color: var(--tap-badge-warning-low-color, --tap-sys-color-content-warning);
  }
`;

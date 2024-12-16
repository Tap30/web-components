import { css } from "lit";

export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  [hidden] {
    display: none !important;
  }

  :host {
    display: inline-block;
  }

  .root:not(.dot).md {
    --badge-height: 1.5rem;
  }

  .root:not(.dot).sm {
    --badge-height: 1.25rem;
  }

  .root.pill.md {
    --badge-min-width: 2rem;
    --badge-font-size: var(--tap-sys-typography-body-xs-size);
    --badge-font-height: var(--tap-sys-typography-body-xs-height);
    --badge-font-weight: var(--tap-sys-typography-body-xs-weight);
  }

  .root.pill.sm {
    --badge-min-width: 2rem;
    --badge-font-size: var(--tap-sys-typography-label-xxs-size);
    --badge-font-height: var(--tap-sys-typography-label-xxs-height);
    --badge-font-weight: var(--tap-sys-typography-label-xxs-weight);
  }

  .root.numeral.md {
    --badge-min-width: 1.5rem;
    --badge-font-size: var(--tap-sys-typography-label-md-size);
    --badge-font-height: var(--tap-sys-typography-label-md-height);
    --badge-font-weight: var(--tap-sys-typography-label-md-weight);
  }

  .root.numeral.sm {
    --badge-min-width: 1.25rem;
    --badge-font-size: var(--tap-sys-typography-label-xs-size);
    --badge-font-height: var(--tap-sys-typography-label-xs-height);
    --badge-font-weight: var(--tap-sys-typography-label-xs-weight);
  }

  .root.dot {
    --badge-height: 0.375rem;
    --badge-min-width: unset;

    width: 0.375rem;

    padding: 0;
  }

  .root.success.high {
    --badge-bg-color: var(--tap-sys-color-surface-positive);
    --badge-color: var(--tap-sys-color-content-on-negative);
  }

  .root.info.high {
    --badge-bg-color: var(--tap-sys-color-surface-accent);
    --badge-color: var(--tap-sys-color-content-on-negative);
  }

  .root.error.high {
    --badge-bg-color: var(--tap-sys-color-surface-negative);
    --badge-color: var(--tap-sys-color-content-on-negative);
  }

  .root.warning.high {
    --badge-bg-color: var(--tap-sys-color-surface-warning);
    --badge-color: var(--tap-sys-color-content-on-warning);
  }

  .root.success.low {
    --badge-bg-color: var(--tap-sys-color-surface-positive-light);
    --badge-color: var(--tap-sys-color-content-positive);
  }

  .root.info.low {
    --badge-bg-color: var(--tap-sys-color-surface-accent-light);
    --badge-color: var(--tap-sys-color-content-accent);
  }

  .root.error.low {
    --badge-bg-color: var(--tap-sys-color-surface-negative-light);
    --badge-color: var(--tap-sys-color-content-negative);
  }

  .root.warning.low {
    --badge-bg-color: var(--tap-sys-color-surface-warning-light);
    --badge-color: var(--tap-sys-color-content-warning);
  }

  .root.neutral {
    --badge-bg-color: var(--tap-sys-color-surface-disabled);
    --badge-color: var(--tap-sys-color-content-tertiary);
  }

  .root {
    --badge-font-size: var(--tap-sys-typography-body-xs-size);
    --badge-font-height: var(--tap-sys-typography-body-xs-height);
    --badge-font-weight: var(--tap-sys-typography-body-xs-weight);

    display: inline-flex;
    align-items: center;
    justify-content: center;

    vertical-align: middle;

    gap: var(--tap-sys-spacing-2);

    height: var(--badge-height);
    min-width: var(--badge-min-width);

    font-family: var(--tap-sys-font-family);
    line-height: var(--badge-font-height);
    font-size: var(--badge-font-size);
    font-weight: var(--badge-font-weight);

    border-radius: var(--tap-sys-radius-full);

    color: var(--badge-color);
    background-color: var(--badge-bg-color);

    padding-right: var(--tap-sys-spacing-3-1);
    padding-left: var(--tap-sys-spacing-3-1);
  }
`;

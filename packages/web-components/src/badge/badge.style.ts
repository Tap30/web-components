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
    display: inline-flex;
  }

  .root:not(.dot).medium {
    height: 1.5rem;
    min-width: 1.5rem;
  }

  .root:not(.dot).small {
    height: 1.25rem;
    min-width: 1.25rem;
  }

  .root.dot {
    width: 0.375rem;
    height: 0.375rem;

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
    display: inline-flex;
    align-items: center;
    justify-content: center;

    gap: var(--tap-sys-spacing-2);

    font-family: var(--tap-sys-font-family);
    line-height: var(--tap-sys-typography-body-xs-height);
    font-size: var(--tap-sys-typography-body-xs-size);
    font-weight: var(--tap-sys-typography-body-xs-weight);

    border-radius: var(--tap-sys-radius-full);

    color: var(--badge-color);
    background-color: var(--badge-bg-color);

    padding-right: var(--tap-sys-spacing-3-1);
    padding-left: var(--tap-sys-spacing-3-1);
  }
`;

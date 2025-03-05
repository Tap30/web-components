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
    display: flex;
  }

  .root:not(.dot).md {
    --badge-height: 1.5rem;
  }

  .root:not(.dot).sm {
    --badge-height: 1.25rem;
  }

  .root.pill.md {
    --badge-min-width: 2rem;
    --badge-font-size: var(--tapsi-typography-body-xs-size);
    --badge-font-height: var(--tapsi-typography-body-xs-height);
    --badge-font-weight: var(--tapsi-typography-body-xs-weight);
  }

  .root.pill.sm {
    --badge-min-width: 2rem;
    --badge-font-size: var(--tapsi-typography-label-xxs-size);
    --badge-font-height: var(--tapsi-typography-label-xxs-height);
    --badge-font-weight: var(--tapsi-typography-label-xxs-weight);
  }

  .root.numeral.md {
    --badge-min-width: 1.5rem;
    --badge-font-size: var(--tapsi-typography-label-md-size);
    --badge-font-height: var(--tapsi-typography-label-md-height);
    --badge-font-weight: var(--tapsi-typography-label-md-weight);
  }

  .root.numeral.sm {
    --badge-min-width: 1.25rem;
    --badge-font-size: var(--tapsi-typography-label-xs-size);
    --badge-font-height: var(--tapsi-typography-label-xs-height);
    --badge-font-weight: var(--tapsi-typography-label-xs-weight);
  }

  .root.dot {
    --badge-height: 0.375rem;
    --badge-min-width: unset;

    width: 0.375rem;

    padding: 0;
  }

  .root.success.high {
    --badge-bg-color: var(--tapsi-color-surface-positive);
    --badge-color: var(--tapsi-color-content-on-negative);
  }

  .root.info.high {
    --badge-bg-color: var(--tapsi-color-surface-accent);
    --badge-color: var(--tapsi-color-content-on-negative);
  }

  .root.error.high {
    --badge-bg-color: var(--tapsi-color-surface-negative);
    --badge-color: var(--tapsi-color-content-on-negative);
  }

  .root.warning.high {
    --badge-bg-color: var(--tapsi-color-surface-warning);
    --badge-color: var(--tapsi-color-content-on-warning);
  }

  .root.success.low {
    --badge-bg-color: var(--tapsi-color-surface-positive-light);
    --badge-color: var(--tapsi-color-content-positive);
  }

  .root.info.low {
    --badge-bg-color: var(--tapsi-color-surface-accent-light);
    --badge-color: var(--tapsi-color-content-accent);
  }

  .root.error.low {
    --badge-bg-color: var(--tapsi-color-surface-negative-light);
    --badge-color: var(--tapsi-color-content-negative);
  }

  .root.warning.low {
    --badge-bg-color: var(--tapsi-color-surface-warning-light);
    --badge-color: var(--tapsi-color-content-warning);
  }

  .root.neutral {
    --badge-bg-color: var(--tapsi-color-surface-disabled);
    --badge-color: var(--tapsi-color-content-tertiary);
  }

  .root {
    --badge-font-size: var(--tapsi-typography-body-xs-size);
    --badge-font-height: var(--tapsi-typography-body-xs-height);
    --badge-font-weight: var(--tapsi-typography-body-xs-weight);

    display: inline-flex;
    align-items: center;
    justify-content: center;

    vertical-align: middle;

    gap: var(--tapsi-spacing-2);

    height: var(--badge-height);
    min-width: var(--badge-min-width);

    font-family: var(--tapsi-typography-font-family);
    line-height: var(--badge-font-height);
    font-size: var(--badge-font-size);
    font-weight: var(--badge-font-weight);

    border-radius: var(--tapsi-radius-full);

    color: var(--badge-color);
    background-color: var(--badge-bg-color);

    padding-right: var(--tapsi-spacing-3-1);
    padding-left: var(--tapsi-spacing-3-1);
  }
`;

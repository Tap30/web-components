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

  .sr-only {
    position: absolute;

    width: 1px;
    height: 1px;
    padding: 0;

    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  :host {
    --input-control-bg-color: var(--tapsi-color-surface-tertiary);
    --input-support-color: var(--tapsi-color-content-tertiary);
    --input-label-color: var(--tapsi-color-content-primary);
    --input-color: var(--tapsi-color-content-primary);
    --input-icon-color: var(--tapsi-color-content-secondary);
    --input-placeholder-color: var(--tapsi-color-content-tertiary);

    --input-support-text-size: var(--tapsi-typography-body-sm-size);
    --input-label-text-size: var(--tapsi-typography-label-md-size);
    --input-control-text-size: var(--tapsi-typography-body-md-size);

    --input-support-text-height: var(--tapsi-typography-body-sm-height);
    --input-label-text-height: var(--tapsi-typography-label-md-height);
    --input-control-text-height: var(--tapsi-typography-body-md-height);

    --input-support-text-weight: var(--tapsi-typography-body-sm-weight);
    --input-label-text-weight: var(--tapsi-typography-label-md-weight);
    --input-control-text-weight: var(--tapsi-typography-body-md-weight);

    --input-padding-horizontal: var(--tapsi-spacing-6);

    --input-control-height: 3.25rem;

    --input-control-border-color: transparent;
    --input-control-border-radius: var(--tapsi-radius-3);

    display: inline-block;
    vertical-align: middle;
  }

  .root.disabled {
    --input-control-bg-color: var(--tapsi-color-surface-disabled);
    --input-control-border-color: transparent;
    --input-support-color: var(--tapsi-color-content-disabled);
    --input-label-color: var(--tapsi-color-content-disabled);
    --input-color: var(--tapsi-color-content-disabled);
    --input-icon-color: var(--tapsi-color-content-disabled);
    --input-placeholder-color: var(--tapsi-color-content-disabled);
  }

  .root.sm {
    --input-support-text-size: var(--tapsi-typography-body-xs-size);
    --input-label-text-size: var(--tapsi-typography-label-sm-size);
    --input-control-text-size: var(--tapsi-typography-body-sm-size);

    --input-support-text-height: var(--tapsi-typography-body-xs-height);
    --input-label-text-height: var(--tapsi-typography-label-sm-height);
    --input-control-text-height: var(--tapsi-typography-body-sm-height);

    --input-support-text-weight: var(--tapsi-typography-body-xs-weight);
    --input-label-text-weight: var(--tapsi-typography-label-sm-weight);
    --input-control-text-weight: var(--tapsi-typography-body-sm-weight);

    --input-padding-horizontal: var(--tapsi-spacing-5);

    --input-control-height: 2.5rem;
  }

  .root.md {
    --input-support-text-size: var(--tapsi-typography-body-sm-size);
    --input-label-text-size: var(--tapsi-typography-label-md-size);
    --input-control-text-size: var(--tapsi-typography-body-md-size);

    --input-support-text-height: var(--tapsi-typography-body-sm-height);
    --input-label-text-height: var(--tapsi-typography-label-md-height);
    --input-control-text-height: var(--tapsi-typography-body-md-height);

    --input-support-text-weight: var(--tapsi-typography-body-sm-weight);
    --input-label-text-weight: var(--tapsi-typography-label-md-weight);
    --input-control-text-weight: var(--tapsi-typography-body-md-weight);

    --input-padding-horizontal: var(--tapsi-spacing-6);

    --input-control-height: 3.25rem;
  }

  .control.error {
    --input-control-bg-color: var(--tapsi-color-surface-negative-light);
    --input-control-border-color: var(--tapsi-color-border-negative);
  }

  .root.md .control.rounded {
    --input-control-border-radius: var(--tapsi-spacing-8);
  }

  .root.sm .control.rounded {
    --input-control-border-radius: var(--tapsi-spacing-7);
  }

  .control.error + .supporting-text {
    --input-support-color: var(--tapsi-color-content-negative);
  }

  .control:not(.error):focus-within {
    --input-control-bg-color: var(--tapsi-color-surface-secondary);
    --input-control-border-color: var(--tapsi-color-border-inverse-primary);
    --input-support-color: var(--tapsi-color-content-secondary);
  }

  .control {
    position: relative;
    display: flex;
    align-items: center;

    height: var(--input-control-height);
    width: 100%;

    padding-right: var(--input-padding-horizontal);
    padding-left: var(--input-padding-horizontal);
    gap: var(--tapsi-spacing-4);
    border-radius: var(--input-control-border-radius);

    background-color: var(--input-control-bg-color);
    border: var(--tapsi-stroke-2) solid var(--input-control-border-color);
  }

  .input {
    border: 0;
    outline: none;

    flex: 1 1 0;
    height: 100%;

    color: var(--input-color);
    background-color: transparent;
    caret-color: var(--tapsi-color-surface-accent);

    font-family: var(--tapsi-font-family);
    line-height: var(--input-control-text-height);
    font-size: var(--input-control-text-size);
    font-weight: var(--input-control-text-weight);
  }

  .input::placeholder {
    color: var(--input-placeholder-color);

    font-family: var(--tapsi-font-family);
    line-height: var(--input-control-text-height);
    font-size: var(--input-control-text-size);
    font-weight: var(--input-control-text-weight);
  }

  .leading-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    flex-shrink: 0;

    color: var(--input-icon-color);

    width: 1.5rem;
    height: 1.5rem;
    max-width: 1.5rem;
    max-height: 1.5rem;
    font-size: 1.5rem;
  }

  .trailing {
    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    color: var(--input-placeholder-color);
  }

  .supporting-text {
    color: var(--input-support-color);

    font-family: var(--tapsi-font-family);
    line-height: var(--input-support-text-height);
    font-size: var(--input-support-text-size);
    font-weight: var(--input-support-text-weight);
  }

  .label {
    color: var(--input-label-color);

    font-family: var(--tapsi-font-family);
    line-height: var(--input-label-text-height);
    font-size: var(--input-label-text-size);
    font-weight: var(--input-label-text-weight);
  }
`;

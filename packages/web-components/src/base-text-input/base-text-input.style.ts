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
    --input-control-border-color: transparent;
    --input-support-color: var(--tapsi-color-content-tertiary);
    --input-label-color: var(--tapsi-color-content-primary);
    --input-color: var(--tapsi-color-content-primary);
    --input-icon-color: var(--tapsi-color-content-secondary);
    --input-placeholder-color: var(--tapsi-color-content-tertiary);

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

  .control.error {
    --input-control-bg-color: var(--tapsi-color-surface-negative-light);
    --input-control-border-color: var(--tapsi-color-border-negative);
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

    height: 3.25rem;
    width: 100%;

    padding-right: var(--tapsi-spacing-6);
    padding-left: var(--tapsi-spacing-6);
    gap: var(--tapsi-spacing-4);
    border-radius: var(--tapsi-radius-3);

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
    line-height: var(--tapsi-typography-body-md-height);
    font-size: var(--tapsi-typography-body-md-size);
    font-weight: var(--tapsi-typography-body-md-weight);
  }

  .input::placeholder {
    color: var(--input-placeholder-color);

    font-family: var(--tapsi-font-family);
    line-height: var(--tapsi-typography-body-md-height);
    font-size: var(--tapsi-typography-body-md-size);
    font-weight: var(--tapsi-typography-body-md-weight);
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
    line-height: var(--tapsi-typography-body-sm-height);
    font-size: var(--tapsi-typography-body-sm-size);
    font-weight: var(--tapsi-typography-body-sm-weight);
  }

  .label {
    color: var(--input-label-color);

    font-family: var(--tapsi-font-family);
    line-height: var(--tapsi-typography-label-md-height);
    font-size: var(--tapsi-typography-label-md-size);
    font-weight: var(--tapsi-typography-label-md-weight);
  }
`;

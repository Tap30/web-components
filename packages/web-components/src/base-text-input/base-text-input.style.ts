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
    --input-control-bg-color: var(--tap-sys-color-surface-tertiary);
    --input-control-border-color: transparent;
    --input-support-color: var(--tap-sys-color-content-tertiary);
    --input-label-color: var(--tap-sys-color-content-primary);
    --input-color: var(--tap-sys-color-content-primary);
    --input-icon-color: var(--tap-sys-color-content-secondary);
    --input-placeholder-color: var(--tap-sys-color-content-tertiary);

    display: inline-block;
    vertical-align: middle;
  }

  .root.disabled {
    --input-control-bg-color: var(--tap-sys-color-surface-disabled);
    --input-control-border-color: transparent;
    --input-support-color: var(--tap-sys-color-content-disabled);
    --input-label-color: var(--tap-sys-color-content-disabled);
    --input-color: var(--tap-sys-color-content-disabled);
    --input-icon-color: var(--tap-sys-color-content-disabled);
    --input-placeholder-color: var(--tap-sys-color-content-disabled);
  }

  .control.error {
    --input-control-bg-color: var(--tap-sys-color-surface-negative-light);
    --input-control-border-color: var(--tap-sys-color-border-negative);
  }

  .control.error + .supporting-text {
    --input-support-color: var(--tap-sys-color-content-negative);
  }

  .control:not(.error):focus-within {
    --input-control-bg-color: var(--tap-sys-color-surface-secondary);
    --input-control-border-color: var(--tap-sys-color-border-inverse-primary);
    --input-support-color: var(--tap-sys-color-content-secondary);
  }

  .control {
    position: relative;
    display: flex;
    align-items: center;

    height: 3.25rem;
    width: 100%;

    padding-right: var(--tap-sys-spacing-6);
    padding-left: var(--tap-sys-spacing-6);
    gap: var(--tap-sys-spacing-4);
    border-radius: var(--tap-sys-radius-3);

    background-color: var(--input-control-bg-color);
    border: var(--tap-sys-stroke-2) solid var(--input-control-border-color);
  }

  .input {
    border: 0;
    outline: none;

    flex: 1 1 0;
    height: 100%;

    color: var(--input-color);
    background-color: transparent;
    caret-color: var(--tap-sys-color-surface-accent);

    font-family: var(--tap-sys-font-family);
    line-height: var(--tap-sys-typography-body-md-height);
    font-size: var(--tap-sys-typography-body-md-size);
    font-weight: var(--tap-sys-typography-body-md-weight);
  }

  .input::placeholder {
    color: var(--input-placeholder-color);

    font-family: var(--tap-sys-font-family);
    line-height: var(--tap-sys-typography-body-md-height);
    font-size: var(--tap-sys-typography-body-md-size);
    font-weight: var(--tap-sys-typography-body-md-weight);
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

    font-family: var(--tap-sys-font-family);
    line-height: var(--tap-sys-typography-body-sm-height);
    font-size: var(--tap-sys-typography-body-sm-size);
    font-weight: var(--tap-sys-typography-body-sm-weight);
  }

  .label {
    color: var(--input-label-color);

    font-family: var(--tap-sys-font-family);
    line-height: var(--tap-sys-typography-label-md-height);
    font-size: var(--tap-sys-typography-label-md-size);
    font-weight: var(--tap-sys-typography-label-md-weight);
  }
`;

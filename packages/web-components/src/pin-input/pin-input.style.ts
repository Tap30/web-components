import { css } from "lit";

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    --pin-bg-color: var(--tapsi-color-surface-tertiary);
    --pin-border-color: transparent;
    --support-color: var(--tapsi-color-content-tertiary);
    --input-color: var(--tapsi-color-content-primary);
    --input-placeholder-color: var(--tapsi-color-content-tertiary);
    --label-color: var(--tapsi-color-content-primary);

    display: inline-block;
    vertical-align: middle;
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

  .root.disabled {
    --pin-bg-color: var(--tapsi-color-surface-disabled);
    --pin-border-color: transparent;
    --support-color: var(--tapsi-color-content-disabled);
    --input-color: var(--tapsi-color-content-disabled);
    --label-color: var(--tapsi-color-content-disabled);
    --input-placeholder-color: var(--tapsi-color-content-disabled);

    cursor: not-allowed;
  }

  .root.error {
    --pin-bg-color: var(--tapsi-color-surface-negative-light);
    --pin-border-color: var(--tapsi-color-border-negative);
    --support-color: var(--tapsi-color-content-negative);
  }

  .root:not(.error) .input:focus {
    --pin-bg-color: var(--tapsi-color-surface-secondary);
    --pin-border-color: var(--tapsi-color-border-inverse-primary);
    --support-color: var(--tapsi-color-content-secondary);
  }

  .root {
    font-family: var(--tapsi-typography-font-family);

    display: flex;
    flex-direction: column;

    gap: var(--tapsi-spacing-4);
  }

  .label {
    color: var(--label-color);

    font-family: var(--tapsi-typography-font-family);
    line-height: var(--tapsi-typography-label-md-height);
    font-size: var(--tapsi-typography-label-md-size);
    font-weight: var(--tapsi-typography-label-md-weight);
  }

  .supporting-text {
    color: var(--support-color);

    font-family: var(--tapsi-typography-font-family);
    line-height: var(--tapsi-typography-body-sm-height);
    font-size: var(--tapsi-typography-body-sm-size);
    font-weight: var(--tapsi-typography-body-sm-weight);
  }

  .pins {
    direction: ltr;

    display: flex;
    align-items: center;

    padding-right: var(--tapsi-spacing-6);
    padding-left: var(--tapsi-spacing-6);
    gap: var(--tapsi-spacing-5);
  }

  .input {
    border: 0;
    outline: none;

    width: 3.25rem;
    height: 3.25rem;

    padding: var(--tapsi-spacing-4);

    color: var(--input-color);
    background-color: var(--pin-bg-color);
    caret-color: var(--tapsi-color-surface-accent);

    text-align: center;

    box-shadow: 0 0 0 var(--tapsi-stroke-2) var(--pin-border-color);
    border-radius: var(--tapsi-radius-3);

    font-family: var(--tapsi-typography-font-family);
    line-height: var(--tapsi-typography-headline-sm-height);
    font-size: var(--tapsi-typography-headline-sm-size);
    font-weight: var(--tapsi-typography-headline-sm-weight);
  }

  .input::placeholder {
    color: var(--input-placeholder-color);
  }
`;

export default styles;

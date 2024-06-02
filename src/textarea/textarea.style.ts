import { css } from "lit";

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

  .text-area {
    direction: rtl;
    font-family: var(--tap-sys-font-family);
    display: flex;
    flex-direction: column;
    gap: var(--tap-textarea-sm-spacing, var(--tap-sys-spacing-4));
  }

  .label {
    color: var(--tap-textarea-color-content-primary, var(--tap-sys-color-content-primary));
    line-height: var(--tap-textarea-typography-label-height, var(--tap-sys-typography-label-sm-height));
    font-size: var(--tap-textarea-typography-label-size, var(--tap-sys-typography-label-sm-size));
    font-weight: var(--tap-textarea-typography-label-weight, var(--tap-sys-typography-label-sm-weight));
  }

  .caption {
    color: var(--tap-textarea-color-content-tertiary, var(--tap-sys-color-content-tertiary));
    line-height: var(--tap-textarea-typography-caption-height, var(--tap-sys-typography-body-sm-height));
    font-size: var(--tap-textarea-typography-caption-size, var(--tap-sys-typography-body-sm-size));
    font-weight: var(--tap-textarea-typography-caption-weight, var(--tap-sys-typography-body-sm-weight));
  }

  .container {
    /* FIXME: height of the input is 104px but we dont have 104px in our tokens */
    height: 104px;
    padding: var(--tap-textarea-md-spacing, var(--tap-sys-spacing-5)) var(--tap-textarea-lg-spacing, var(--tap-sys-spacing-6));
    display: flex;
    gap: var(--tap-textarea-sm-spacing, var(--tap-sys-spacing-4));
    background-color: var(--tap-textarea-color-surface-tertiary, var(--tap-sys-color-surface-tertiary));
    border-radius: var(--tap-textarea-radius, var(--tap-sys-radius-3));
    border: 2px solid transparent;
  }

  .container:focus-within {
    background-color: var(--tap-textarea-color-surface-secondary, var(--tap-sys-color-surface-secondary));
    border: 2px solid var(--tap-textarea-color-border-inverse-primary, var(--tap-sys-color-border-inverse-primary));
  }

  .input {
    border: 0;
    outline: none;
    flex: 1;
    background-color: transparent;
    color: var(--tap-textarea-color-content-primary, var(--tap-sys-color-content-primary));
    line-height: var(--tap-textarea-typography-input-height, var(--tap-sys-typography-body-md-height));
    font-size: var(--tap-textarea-typography-input-size, var(--tap-sys-typography-body-md-size));
    font-weight: var(--tap-textarea-typography-input-weight, var(--tap-sys-typography-body-md-weight));
    font-family: inherit;
    resize: none;
  }

  .input::placeholder {
    color: var(--tap-textarea-color-content-tertiary,var( --tap-sys-color-content-tertiary));
    line-height: var(--tap-textarea-typography-placeholder-height, var(--tap-sys-typography-body-md-height));
    font-size: var(--tap-textarea-typography-placeholder-size, var(--tap-sys-typography-body-md-size));
    font-weight: var(--tap-textarea-typography-placeholder-weight, var(--tap-sys-typography-body-md-weight));
    font-family: inherit;
  }

  :host([error]) .caption {
    color: var(--tap-textarea-color-content-negative, var(--tap-sys-color-content-negative));
  }

  :host([error]) .container {
    background-color: var(--tap-textarea-color-surface-negative-light, var(--tap-sys-color-surface-negative-light));
    border-color: var(--tap-textarea-color-border-negative, var(--tap-sys-color-border-negative));
  }

  :host([disabled]) .container {
    background-color: var(--tap-textarea-color-surface-disabled, var(--tap-sys-color-surface-disabled));
    border: 2px solid transparent;
  }

  :host([disabled]) .caption,
  :host([disabled]) .label,
  :host([disabled]) .input,
  :host([disabled]) .input::placeholder {
    color: var(--tap-textarea-color-content-disabled, var(--tap-sys-color-content-disabled));
  }
`;

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

  .field {
    direction: rtl;
    font-family: var(--tap-sys-font-family);
    display: flex;
    flex-direction: column;
    gap: var(--tap-sys-spacing-4);
  }

  .label {
    color: var(--tap-sys-color-content-primary);
    line-height: var(--tap-sys-typography-label-sm-height);
    font-size: var(--tap-sys-typography-label-sm-size);
    font-weight: var(--tap-sys-typography-label-sm-weight);
  }

  .caption {
    color: var(--tap-sys-color-content-tertiary);
    line-height: var(--tap-sys-typography-body-sm-height);
    font-size: var(--tap-sys-typography-body-sm-size);
    font-weight: var(--tap-sys-typography-body-sm-weight);
  }

  .container {
    /* FIXME: height of the input is 52px but we dont have 52px in our tokens */
    height: var(--tap-sys-spacing-11);
    padding: 0 var(--tap-sys-spacing-6);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--tap-sys-spacing-4);
    background-color: var(--tap-sys-color-surface-tertiary);
    border-radius: var(--tap-sys-radius-3);
    border: 2px solid transparent;
  }

  .container:focus-within {
    background-color: var(--tap-sys-color-surface-secondary);
    border: 2px solid var(--tap-sys-color-border-inverse-primary);
  }

  .input {
    border: 0;
    outline: none;
    flex: 1;
    background-color: transparent;
    color: var(--tap-sys-color-content-primary);
    line-height: var(--tap-sys-typography-body-md-height);
    font-size: var(--tap-sys-typography-body-md-size);
    font-weight: var(--tap-sys-typography-body-md-weight);
    font-family: inherit;
  }

  .input::placeholder {
    color: var(--tap-sys-color-content-tertiary);
    line-height: var(--tap-sys-typography-body-md-height);
    font-size: var(--tap-sys-typography-body-md-size);
    font-weight: var(--tap-sys-typography-body-md-weight);
    font-family: inherit;
  }

  :host([error]) .caption {
    color: var(--tap-sys-color-content-negative);
  }

  :host([error]) .container {
    background-color: var(--tap-sys-color-surface-negative-light);
    border-color: var(--tap-sys-color-border-negative);
  }

  :host([disabled]) .container {
    background-color: var(--tap-sys-color-surface-disabled);
  }

  :host([disabled]) .caption,
  :host([disabled]) .label,
  :host([disabled]) .input,
  :host([disabled]) .input::placeholder {
    color: var(--tap-sys-color-content-disabled);
  }
`;

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
    font-family: var(--tap-font-family, var(--tap-sys-font-family));
    display: flex;
    flex-direction: column;
    gap: var(--tap-textfield-field-gap, var(--tap-sys-spacing-4));
  }

  .label {
    color: var(
      --tap-textfield-label-color,
      var(--tap-sys-color-content-primary)
    );
    line-height: var(
      --tap-textfield-label-line-height,
      var(--tap-sys-typography-label-sm-height)
    );
    font-size: var(
      --tap-textfield-label-font-size,
      var(--tap-sys-typography-label-sm-size)
    );
    font-weight: var(
      --tap-textfield-label-font-weight,
      var(--tap-sys-typography-label-sm-weight)
    );
  }

  .caption {
    color: var(
      --tap-textfield-caption-color,
      var(--tap-sys-color-content-tertiary)
    );
    line-height: var(
      --tap-textfield-caption-line-height,
      var(--tap-sys-typography-body-sm-height)
    );
    font-size: var(
      --tap-textfield-caption-font-size,
      var(--tap-sys-typography-body-sm-size)
    );
    font-weight: var(
      --tap-textfield-caption-font-weight,
      var(--tap-sys-typography-body-sm-weight)
    );
  }

  .container {
    /* FIXME: height of the input is 52px but we dont have 52px in our tokens */
    height: var(--tap-textfield-container-height, var(--tap-sys-spacing-11));
    padding: 0 var(--tap-textfield-container-padding, var(--tap-sys-spacing-6));
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--tap-textfield-container-gap, var(--tap-sys-spacing-4));
    background-color: var(
      --tap-textfield-container-background-color,
      var(--tap-sys-color-surface-tertiary)
    );
    border-radius: var(
      --tap-textfield-container-border-radius,
      var(--tap-sys-radius-3)
    );
    border: 2px solid transparent;
  }

  .container:focus-within {
    background-color: var(
      --tap-textfield-focus-background-color,
      var(--tap-sys-color-surface-secondary)
    );
    border: 2px solid
      var(
        --tap-textfield-focus-border-width,
        var(--tap-sys-color-border-inverse-primary)
      );
  }

  .input {
    border: 0;
    outline: none;
    flex: 1;
    background-color: transparent;
    color: var(
      --tap-textfield-input-color,
      var(--tap-sys-color-content-primary)
    );
    line-height: var(
      --tap-textfield-input-line-height,
      var(--tap-sys-typography-body-md-height)
    );
    font-size: var(
      --tap-textfield-input-font-size,
      var(--tap-sys-typography-body-md-size)
    );
    font-weight: var(
      --tap-textfield-input-font-weight,
      var(--tap-sys-typography-body-md-weight)
    );
    font-family: inherit;
  }

  .input::placeholder {
    color: var(
      --tap-textfield-input-placeholder-color,
      var(--tap-sys-color-content-tertiary)
    );
    line-height: var(
      --tap-textfield-input-placeholder-line-height,
      var(--tap-sys-typography-body-md-height)
    );
    font-size: var(
      --tap-textfield-input-placeholder-font-size,
      var(--tap-sys-typography-body-md-size)
    );
    font-weight: var(
      --tap-textfield-input-placeholder-font-weight,
      var(--tap-sys-typography-body-md-weight)
    );
    font-family: inherit;
  }

  :host([error]) .caption {
    color: var(
      --tap-textfield-error-caption-color,
      var(--tap-sys-color-content-negative)
    );
  }

  :host([error]) .container {
    background-color: var(
      --tap-textfield-error-container-background-color,
      var(--tap-sys-color-surface-negative-light)
    );
    border-color: var(
      --tap-textfield-error-container-border-color,
      var(--tap-sys-color-border-negative)
    );
  }

  :host([disabled]) .container {
    background-color: var(
      --tap-textfield-disabled-container-background-color,
      var(--tap-sys-color-surface-disabled)
    );
  }

  :host([disabled]) .caption,
  :host([disabled]) .label,
  :host([disabled]) .input,
  :host([disabled]) .input::placeholder {
    color: var(
      --tap-textfield-disabled-container-color,
      var(--tap-sys-color-content-disabled)
    );
  }
`;

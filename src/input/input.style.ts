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
    gap: var(--tap-input-field-gap, var(--tap-sys-spacing-4));
  }

  .label {
    color: var(--tap-input-label-color, var(--tap-sys-color-content-primary));
    line-height: var(
      --tap-input-label-line-height,
      var(--tap-sys-typography-label-sm-height)
    );
    font-size: var(
      --tap-input-label-font-size,
      var(--tap-sys-typography-label-sm-size)
    );
    font-weight: var(
      --tap-input-label-font-weight,
      var(--tap-sys-typography-label-sm-weight)
    );
  }

  .caption {
    color: var(
      --tap-input-caption-color,
      var(--tap-sys-color-content-tertiary)
    );
    line-height: var(
      --tap-input-caption-line-height,
      var(--tap-sys-typography-body-sm-height)
    );
    font-size: var(
      --tap-input-caption-font-size,
      var(--tap-sys-typography-body-sm-size)
    );
    font-weight: var(
      --tap-input-caption-font-weight,
      var(--tap-sys-typography-body-sm-weight)
    );
  }

  .container {
    /* FIXME: height of the input is 52px but we dont have 52px in our tokens */
    height: var(--tap-input-container-height, var(--tap-sys-spacing-11));
    padding: 0 var(--tap-input-container-padding, var(--tap-sys-spacing-6));
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--tap-input-container-gap, var(--tap-sys-spacing-4));
    background-color: var(
      --tap-input-container-background-color,
      var(--tap-sys-color-surface-tertiary)
    );
    border-radius: var(
      --tap-input-container-border-radius,
      var(--tap-sys-radius-3)
    );
    border: 2px solid transparent;
  }

  .container:focus-within {
    background-color: var(
      --tap-input-focus-background-color,
      var(--tap-sys-color-surface-secondary)
    );
    border: 2px solid
      var(
        --tap-input-focus-border-width,
        var(--tap-sys-color-border-inverse-primary)
      );
  }

  :host([error]) .caption {
    color: var(
      --tap-input-error-caption-color,
      var(--tap-sys-color-content-negative)
    );
  }

  :host([error]) .container {
    background-color: var(
      --tap-input-error-container-background-color,
      var(--tap-sys-color-surface-negative-light)
    );
    border-color: var(
      --tap-input-error-container-border-color,
      var(--tap-sys-color-border-negative)
    );
  }

  :host([disabled]) .container {
    background-color: var(
      --tap-input-disabled-container-background-color,
      var(--tap-sys-color-surface-disabled)
    );
    border: 2px solid transparent;
  }

  :host([disabled]) .caption,
  :host([disabled]) .label {
    color: var(
      --tap-input-disabled-container-color,
      var(--tap-sys-color-content-disabled)
    );
  }
`;

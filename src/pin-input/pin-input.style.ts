import { css } from 'lit';

export default css`
  :host {
    --tap-pin-input-box-sizing: border-box;
    --tap-pin-input-direction: rtl;

    --tap-pin-input-description-font-family: var(
      --tap-sys-typography-body-sm-font
    );
    --tap-pin-input-description-font-size: var(
      --tap-sys-typography-body-sm-size
    );
    --tap-pin-input-description-line-height: var(
      --tap-sys-typography-body-sm-height
    );
    --tap-pin-input-description-font-weight: var(
      --tap-sys-typography-body-sm-weight
    );

    --tap-pin-input-description-font-family: var(
      --tap-sys-typography-body-sm-font
    );
    --tap-pin-input-description-font-size: var(
      --tap-sys-typography-body-sm-size
    );
    --tap-pin-input-description-line-height: var(
      --tap-sys-typography-body-sm-height
    );
    --tap-pin-input-description-font-weight: var(
      --tap-sys-typography-body-sm-weight
    );
    --tap-pin-input-description-text-color: var(
      --tap-sys-color-content-tertiary
    );
    --tap-pin-input-description-error-text-color: var(
      --tap-sys-color-content-negative
    );
    --tap-pin-input-description-disabled-text-color: var(
      --tap-sys-color-content-disabled
    );

    --tap-inpu-input-title-font-family: var(--tap-sys-typography-body-md-font);
    --tap-inpu-input-title-font-size: var(--tap-sys-typography-body-md-size);
    --tap-inpu-input-title-line-height: var(
      --tap-sys-typography-body-md-height
    );
    --tap-inpu-input-title-font-weight: var(
      --tap-sys-typography-body-md-weight
    );
    --tap-inpu-input-title-text-color: var(--tap-sys-color-content-primary);
    --tap-inpu-input-title-disabled-text-color: var(
      --tap-sys-color-content-disabled
    );

    --tap-pin-input-justify-content: start;
    --tap-input-input-vertical-gap: 0.5rem;
    --tap-pin-input-horizontal-cell-gap: 1rem;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: var(--tap-pin-input-box-sizing);
    direction: var(--tap-pin-input-direction);
  }

  [hidden] {
    display: none !important;
  }

  :host([has-error]) .description {
    color: var(--tap-pin-input-description-error-text-color);
  }

  :host([disabled]) .title,
  :host([disabled]) .description {
    color: var(--tap-inpu-input-title-disabled-text-color);
  }

  :host([disabled]) .description {
    color: var(--tap-pin-input-description-disabled-text-color);
  }

  .pin-input {
  }

  .pin-input {
    display: flex;
    row-gap: var(--tap-input-input-vertical-gap);
    flex-direction: column;
  }

  .title {
    flex: 0 1;
    font-family: var(--tap-inpu-input-title-font-family);
    font-size: var(--tap-inpu-input-title-font-size);
    font-weight: var(--tap-inpu-input-title-font-weight);
    line-height: var(--tap-inpu-input-title-line-height);
    color: var(--tap-inpu-input-title-text-color);
  }

  .description {
    flex: 0 1;
    font-family: var(--tap-pin-input-description-font-family);
    font-size: var(--tap-pin-input-description-font-size);
    font-weight: var(--tap-pin-input-description-font-weight);
    line-height: var(--tap-pin-input-description-line-height);
    color: var(--tap-pin-input-description-text-color);
  }

  .input-cells {
    display: flex;
    justify-content: var(--tap-pin-input-justify-content);
    flex-direction: row-reverse;
    gap: var(--tap-pin-input-horizontal-cell-gap);
  }
`;

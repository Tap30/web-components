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

  .field.error {
    --input-caption-color: var(--tap-sys-color-content-negative);
    --input-container-bg-color: var(--tap-sys-color-surface-negative-light);
    --input-container-border-color: var(--tap-sys-color-border-negative);
  }

  .field.disabled {
    --input-label-color: var(--tap-sys-color-content-disabled);
    --input-caption-color: var(--tap-sys-color-content-disabled);
    --input-container-bg-color: var(--tap-sys-color-surface-disabled);
    --input-container-border-color: transparent;
  }

  .field {
    --input-label-color: var(--tap-sys-color-content-primary);
    --input-caption-color: var(--tap-sys-color-content-tertiary);
    --input-container-bg-color: var(--tap-sys-color-surface-tertiary);
    --input-container-border-color: transparent;

    direction: rtl;
    font-family: var(--tap-sys-font-family);

    display: flex;
    flex-direction: column;

    gap: var(--tap-sys-spacing-4);
  }

  .label {
    color: var(--input-label-color);

    line-height: var(--tap-sys-typography-label-sm-height);
    font-size: var(--tap-sys-typography-label-sm-size);
    font-weight: var(--tap-sys-typography-label-sm-weight);
  }

  .caption {
    color: var(--input-caption-color);

    line-height: var(--tap-sys-typography-body-sm-height);
    font-size: var(--tap-sys-typography-body-sm-size);
    font-weight: var(--tap-sys-typography-body-sm-weight);
  }

  .container {
    height: 3.25rem;
    padding: 0 var(--tap-sys-spacing-6);

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: var(--tap-sys-spacing-4);

    background-color: var(--input-container-bg-color);
    border-radius: var(--tap-sys-radius-3);
    border: var(--tap-sys-stroke-2) solid var(--input-container-border-color);
  }

  .container input,
  .container textarea {
    caret-color: var(--tap-sys-color-surface-accent);
  }

  .container:focus-within {
    background-color: var(--tap-sys-color-surface-secondary);
    border: var(--tap-sys-stroke-2) solid
      var(--tap-sys-color-border-inverse-primary);
  }
`;

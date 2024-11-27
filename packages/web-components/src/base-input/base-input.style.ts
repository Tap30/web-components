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

  .root.error {
    --input-caption-color: var(--tap-sys-color-content-negative);
  }

  .root.disabled {
    --input-label-color: var(--tap-sys-color-content-disabled);
    --input-caption-color: var(--tap-sys-color-content-disabled);

    cursor: not-allowed;
  }

  .root {
    --input-label-color: var(--tap-sys-color-content-primary);
    --input-caption-color: var(--tap-sys-color-content-tertiary);

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

  .control-wrapper {
    display: flex;

    gap: var(--tap-sys-spacing-4);
  }

  /* .control {
    height: 3.25rem;
    padding: 0 var(--tap-sys-spacing-6);

    gap: var(--tap-sys-spacing-4);

    background-color: var(--input-control-bg-color);
    border-radius: var(--tap-sys-radius-3);
    border: var(--tap-sys-stroke-2) solid var(--input-control-border-color);
  } */

  /* .control input,
  .control textarea {
    caret-color: var(--tap-sys-color-surface-accent);
  } */

  /* .root:not(.no-control-focus-border) .control:focus-within {
    background-color: var(--tap-sys-color-surface-secondary);
    border: var(--tap-sys-stroke-2) solid
      var(--tap-sys-color-border-inverse-primary);
  } */
`;

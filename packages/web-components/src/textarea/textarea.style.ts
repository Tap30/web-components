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

  :host {
    --textarea-primary-text-color: var(--tap-sys-color-content-primary);
    --textarea-secondary-text-color: var(--tap-sys-color-content-tertiary);
  }

  .input.disabled {
    --textarea-primary-text-color: var(--tap-sys-color-content-disabled);
    --textarea-secondary-text-color: var(--tap-sys-color-content-disabled);
  }

  .container {
    height: 6.5rem;
    padding: var(--tap-sys-spacing-5) var(--tap-sys-spacing-6);

    align-items: flex-start;
  }

  .input {
    border: 0;
    outline: none;

    flex: 1 1 0;
    height: 100%;

    color: var(--textarea-primary-text-color);
    background-color: transparent;

    line-height: var(--tap-sys-typography-body-md-height);
    font-size: var(--tap-sys-typography-body-md-size);
    font-weight: var(--tap-sys-typography-body-md-weight);
    font-family: inherit;

    resize: none;
  }

  .input::placeholder {
    color: var(--textarea-secondary-text-color);

    line-height: var(--tap-sys-typography-body-md-height);
    font-size: var(--tap-sys-typography-body-md-size);
    font-weight: var(--tap-sys-typography-body-md-weight);
    font-family: inherit;
  }
`;

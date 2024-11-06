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
    --textfield-primary-text-color: var(--tap-sys-color-content-primary);
    --textfield-leading-icon-color: var(--tap-sys-color-content-secondary);
    --textfield-secondary-text-color: var(--tap-sys-color-content-tertiary);
  }

  .input.disabled {
    --textfield-primary-text-color: var(--tap-sys-color-content-disabled);
    --textfield-leading-icon-color: var(--tap-sys-color-content-disabled);
    --textfield-secondary-text-color: var(--tap-sys-color-content-disabled);
  }

  .input {
    border: 0;
    outline: none;

    flex: 1 1 0;

    color: var(--textfield-primary-text-color);
    background-color: transparent;

    line-height: var(--tap-sys-typography-body-md-height);
    font-size: var(--tap-sys-typography-body-md-size);
    font-weight: var(--tap-sys-typography-body-md-weight);
  }

  .input::-webkit-calendar-picker-indicator {
    filter: brightness(0);
  }

  .input::placeholder {
    color: var(--textfield-secondary-text-color);

    line-height: var(--tap-sys-typography-body-md-height);
    font-size: var(--tap-sys-typography-body-md-size);
    font-weight: var(--tap-sys-typography-body-md-weight);
  }

  .leading-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    color: var(--textfield-leading-icon-color);
    fill: var(--textfield-leading-icon-color);

    width: 1.5rem;
    height: 1.5rem;
    max-width: 1.5rem;
    max-height: 1.5rem;
  }

  .trailing {
    display: flex;
    align-items: center;
    justify-content: center;

    color: var(--textfield-secondary-text-color);
  }
`;

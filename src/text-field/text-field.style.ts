import { css } from "lit";

export default css`
  .input {
    border: 0;
    outline: none;
    flex: 1;
    background-color: transparent;
    color: var(
      --tap-text-field-input-color,
      var(--tap-sys-color-content-primary)
    );
    line-height: var(
      --tap-text-field-input-line-height,
      var(--tap-sys-typography-body-md-height)
    );
    font-size: var(
      --tap-text-field-input-font-size,
      var(--tap-sys-typography-body-md-size)
    );
    font-weight: var(
      --tap-text-field-input-font-weight,
      var(--tap-sys-typography-body-md-weight)
    );
    font-family: inherit;
  }

  .input::-webkit-calendar-picker-indicator {
    filter: brightness(0);
  }

  .input::placeholder {
    color: var(
      --tap-text-field-input-placeholder-color,
      var(--tap-sys-color-content-tertiary)
    );
    line-height: var(
      --tap-text-field-input-placeholder-line-height,
      var(--tap-sys-typography-body-md-height)
    );
    font-size: var(
      --tap-text-field-input-placeholder-font-size,
      var(--tap-sys-typography-body-md-size)
    );
    font-weight: var(
      --tap-text-field-input-placeholder-font-weight,
      var(--tap-sys-typography-body-md-weight)
    );
    font-family: inherit;
  }
  :host([disabled]) .input,
  :host([disabled]) .input::placeholder {
    color: var(
      --tap-text-field-disabled-container-color,
      var(--tap-sys-color-content-disabled)
    );
  }
`;

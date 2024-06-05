import { css } from "lit";

export default css`
  .container {
    /* FIXME: height of the input is 104px but we dont have 104px in our tokens */
    height: 104px;
    padding: var(--tap-textarea-md-spacing, var(--tap-sys-spacing-5)) var(--tap-textarea-lg-spacing, var(--tap-sys-spacing-6));
    align-items: flex-start;
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

  :host([disabled]) .input,
  :host([disabled]) .input::placeholder {
    color: var(--tap-textarea-color-content-disabled, var(--tap-sys-color-content-disabled));
  }
`;

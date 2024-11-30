import { css } from "lit";
import { FOCUS_RING_LINE, FOCUS_RING_OFFSET } from "../internals";

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
    --input-control-bg-color: var(--tap-sys-color-surface-primary);
    --input-control-border-color: var(--tap-sys-color-surface-inverse-primary);
    --input-control-color: var(--tap-sys-color-content-on-inverse);

    display: inline-block;
    vertical-align: middle;
  }

  .root.error {
    --input-control-bg-color: var(--tap-sys-color-surface-negative-light);
    --input-control-border-color: var(--tap-sys-color-border-negative);
  }

  .root.disabled {
    --input-control-bg-color: var(--tap-sys-color-surface-disabled);
    --input-control-border-color: var(--tap-sys-color-surface-disabled);
    --input-control-color: var(--tap-sys-color-content-disabled);
  }

  .root:not(.disabled) .control.checked {
    --input-control-bg-color: var(--tap-sys-color-surface-inverse-primary);
    --input-control-color: var(--tap-sys-color-content-on-inverse);
  }

  .label {
    order: 2;
  }

  .control {
    order: 1;

    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: var(--tap-sys-radius-full);

    height: 1.25rem;
    width: 1.25rem;

    color: var(--input-control-color);
    background-color: var(--input-control-bg-color);
    box-shadow: 0 0 0 1px var(--input-control-border-color);
  }

  .input {
    appearance: none;
    margin: 0;
    outline: none;
    border: none;

    border-radius: inherit;

    cursor: pointer;

    position: absolute;
    inset: 0;
    z-index: 1;
  }

  .input:focus-visible {
    outline: ${FOCUS_RING_LINE};
    outline-offset: ${FOCUS_RING_OFFSET};
  }
`;

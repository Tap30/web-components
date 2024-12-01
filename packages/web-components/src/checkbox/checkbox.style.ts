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
    --input-box-bg-color: var(--tap-sys-color-surface-primary);
    --input-box-border-color: var(--tap-sys-color-surface-inverse-primary);
    --input-control-color: var(--tap-sys-color-content-on-inverse);

    display: inline-block;
    vertical-align: middle;
  }

  .root.disabled {
    --input-box-bg-color: var(--tap-sys-color-surface-disabled);
    --input-box-border-color: var(--tap-sys-color-surface-disabled);
    --input-control-color: var(--tap-sys-color-content-disabled);
  }

  .root:not(.disabled) .control.checked,
  .root:not(.disabled) .control.indeterminate {
    --input-box-bg-color: var(--tap-sys-color-surface-inverse-primary);
    --input-control-color: var(--tap-sys-color-content-on-inverse);
  }
  .control {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 2.5rem;
    width: 2.5rem;

    color: var(--input-control-color);
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

  .input:focus-visible + .box {
    outline: ${FOCUS_RING_LINE};
    outline-offset: ${FOCUS_RING_OFFSET};
  }

  .box {
    height: 1.25rem;
    width: 1.25rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: var(--tap-sys-radius-1);

    background-color: var(--input-box-bg-color);
    box-shadow: 0 0 0 1px var(--input-box-border-color);
  }
`;

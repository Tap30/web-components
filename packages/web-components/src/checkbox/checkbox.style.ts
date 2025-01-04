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
    --input-box-bg-color: var(--tapsi-color-surface-primary);
    --input-box-filled-bg-color: var(--tapsi-color-surface-inverse-primary);
    --input-box-border-color: var(--tapsi-color-surface-inverse-primary);
    --input-control-color: var(--tapsi-color-content-on-inverse);
    --checkbox-overlay-size: 0;

    display: inline-block;
    vertical-align: middle;
  }

  .root.disabled {
    --input-box-bg-color: var(--tapsi-color-surface-disabled);
    --input-box-border-color: var(--tapsi-color-surface-disabled);
    --input-control-color: var(--tapsi-color-content-disabled);
  }

  .root:not(.disabled) .control.checked,
  .root:not(.disabled) .control.indeterminate {
    --input-control-color: var(--tapsi-color-content-on-inverse);
    --checkbox-overlay-size: 2rem;
  }

  .root:not(.disabled) .control.error {
    --input-box-border-color: var(--tapsi-color-surface-negative);
    --input-box-filled-bg-color: var(--tapsi-color-surface-negative);
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

    position: relative;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: var(--tapsi-radius-1);

    background-color: var(--input-box-bg-color);
    box-shadow: 0 0 0 var(--tapsi-spacing-1) var(--input-box-border-color) inset;
    transition:
      box-shadow 120ms ease,
      background-color 120ms ease;
  }

  .root:not(.disabled) .box::before {
    content: "";

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 50%;

    width: var(--checkbox-overlay-size);
    height: var(--checkbox-overlay-size);

    background-color: var(--input-box-filled-bg-color);

    transition:
      width 120ms ease,
      height 120ms ease,
      background-color 120ms ease;
  }

  .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);

    transition:
      opacity 60ms 60ms ease,
      transform 60ms 60ms ease;
  }

  .icon.hidden {
    transform: translate(-50%, -50%) scale(0);
    transition:
      opacity 120ms ease,
      transform 120ms ease;
  }

  @media (prefers-reduced-motion) {
    .box,
    .box::before,
    .icon {
      transition: none;
    }
  }
`;

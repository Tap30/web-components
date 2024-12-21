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
    --input-control-track-bg-color: var(--tap-sys-color-surface-tertiary);
    --input-control-knob-bg-color: var(--tap-sys-color-surface-primary);
    --input-control-color: var(--tap-sys-color-content-primary);

    display: inline-block;
    vertical-align: middle;
  }

  .root.disabled {
    --input-control-track-bg-color: var(--tap-sys-color-surface-disabled);
    --input-control-knob-bg-color: var(--tap-sys-color-surface-primary);
    --input-control-color: var(--tap-sys-color-content-disabled);
  }

  .root:not(.disabled) .control.selected {
    --input-control-track-bg-color: var(
      --tap-sys-color-surface-inverse-primary
    );
    --input-control-knob-bg-color: var(--tap-sys-color-surface-primary);
    --input-control-color: var(--tap-sys-color-content-primary);
  }

  .control {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 2.5rem;
    width: 3rem;

    color: var(--input-control-color);
  }

  .input {
    appearance: none;
    margin: 0;
    outline: none;
    border: none;

    border-radius: var(--tap-sys-radius-full);

    cursor: pointer;

    position: absolute;
    inset: 0;
    z-index: 1;
  }

  .input:focus-visible + .track {
    outline: ${FOCUS_RING_LINE};
    outline-offset: ${FOCUS_RING_OFFSET};
  }

  .track {
    width: 100%;
    height: 1.875rem;
    border-radius: var(--tap-sys-radius-full);

    background-color: var(--input-control-track-bg-color);

    transition: background-color 240ms ease;
  }

  .knob {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.625rem;
    height: 1.625rem;

    border-radius: 50%;

    position: absolute;

    background-color: var(--input-control-knob-bg-color);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);

    transform: translateX(0.5625rem);

    transition:
      transform 240ms ease,
      box-shadow 240ms ease;
  }

  .root.disabled .knob {
    box-shadow: none;
  }

  .control.selected .knob {
    box-shadow: none;
    transform: translateX(-0.5625rem);
  }

  @media (prefers-reduced-motion) {
    .track,
    .knob {
      transition: none;
    }
  }
`;

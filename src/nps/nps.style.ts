import { css } from "lit";

export default css`
  :host {
    box-sizing: border-box;
    direction: ltr;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }

  .root {
    font-family: var(--tap-font-family, var(--tap-sys-font-family)), serif;
    position: relative;
    width: inherit;
    border: var(--tap-sys-stroke-1) solid var(--tap-palette-black);
    height: var(--tap-sys-spacing-12);
    border-radius: var(--tap-sys-radius-5);
    display: flex;
  }

  .gradient {
    transition:
      width 0.1s,
      background-color 0.3s,
      border-radius 0.1s;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 0;
    background: var(--nps-gradient-color, transparent);
    border-radius: var(--tap-sys-radius-5) 0 0 var(--tap-sys-radius-5);
  }

  .gradient.red {
    --nps-gradient-color: var(--tap-palette-red-100);
  }

  .gradient.green {
    --nps-gradient-color: var(--tap-palette-green-100);
  }

  .gradient.gray {
    --nps-gradient-color: var(--tap-palette-gray-100);
  }

  .gradient.yellow {
    --nps-gradient-color: var(--tap-palette-yellow-100);
  }

  .gradient::after {
    content: "";
    top: 0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background-image: linear-gradient(
      to right,
      var(--tap-palette-white),
      transparent
    );
    border-radius: var(--tap-sys-radius-5) 0 0 var(--tap-sys-radius-5);
  }

  .gradient.rounded {
    border-radius: var(--tap-sys-radius-5);
  }

  .rate-cell {
    position: relative;
    width: 100%;
    display: flex;
    align-items: stretch;
  }

  .rate {
    min-width: 28px;
    background: transparent;
    outline: none;
    border: none;
    z-index: 1;
    width: 100%;
    color: var(--tap-sys-color-content-disabled);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .label {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translate(-50%, -8px);
    z-index: 3;
    background-color: var(--tap-sys-color-surface-inverse-secondary);
    height: 28px;
    width: 28px;
    color: var(--tap-sys-color-surface-white);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--tap-sys-radius-3);
  }

  .slider {
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    z-index: 2;
    height: 100%;
    opacity: 0;
  }

  .dot {
    transition: transform 0.1s;
    width: 3px;
    height: 3px;
    background-color: var(--tap-sys-color-content-disabled);
    border-radius: var(--tap-sys-radius-full);
  }

  .dot-selected {
    transform: scale(2);
    background-color: var(--tap-palette-black);
  }
`;

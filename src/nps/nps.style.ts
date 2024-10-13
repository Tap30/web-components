import { css, unsafeCSS } from "lit";
import { BASENAME } from "./constants";

const ROOT = unsafeCSS(BASENAME);

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

  .${ROOT}__container {
    font-family: var(--tap-font-family, var(--tap-sys-font-family)), serif;
    position: relative;
    width: max-content;
    border: var(--tap-sys-stroke-1) solid var(--tap-palette-black);
    height: var(--tap-sys-spacing-12);
    border-radius: var(--tap-sys-radius-5);
    display: flex;
  }

  .${ROOT}__gradient_red {
    --nps-gradient-color: var(--tap-palette-red-100);
  }

  .${ROOT}__gradient_green {
    --nps-gradient-color: var(--tap-palette-green-100);
  }

  .${ROOT}__gradient_gray {
    --nps-gradient-color: var(--tap-palette-gray-100);
  }

  .${ROOT}__gradient_yellow {
    --nps-gradient-color: var(--tap-palette-yellow-100);
  }

  .${ROOT}__gradient {
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

  .${ROOT}__gradient::after {
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

  .${ROOT}__rounded_end {
    border-radius: var(--tap-sys-radius-5);
  }

  .${ROOT}__rate_wrapper {
    position: relative;
    width: 100%;
    display: flex;
    align-items: stretch;
  }

  .${ROOT}__rate {
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

  .${ROOT}__label {
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
  .${ROOT}__slider {
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

  .${ROOT}__dot {
    width: 3px;
    height: 3px;
    background-color: var(--tap-sys-color-content-disabled);
    border-radius: var(--tap-sys-radius-full);
  }
`;

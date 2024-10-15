import { css, unsafeCSS } from "lit";
import { BASENAME, Classes, GradientColorClasses, Parts } from "./constants";

const ROOT = unsafeCSS(BASENAME);

const container = unsafeCSS(Parts.CONTAINER);
const dot = unsafeCSS(Parts.DOT);
const slider = unsafeCSS(Parts.SLIDER);
const label = unsafeCSS(Parts.LABEL);
const rate = unsafeCSS(Parts.RATE);
const rateWrapper = unsafeCSS(Parts.RATE_WRAPPER);
const gradient = unsafeCSS(Parts.GRADIENT);

const gradientRounded = unsafeCSS(Classes.GRADIENT_ROUNDED);
const dotSelected = unsafeCSS(Classes.DOT_SELECTED);

const gradientRed = unsafeCSS(GradientColorClasses.RED);
const gradientYellow = unsafeCSS(GradientColorClasses.YELLOW);
const gradientGray = unsafeCSS(GradientColorClasses.GRAY);
const gradientGreen = unsafeCSS(GradientColorClasses.GREEN);

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

  .${container} {
    font-family: var(--tap-font-family, var(--tap-sys-font-family)), serif;
    position: relative;
    width: max-content;
    border: var(--tap-sys-stroke-1) solid var(--tap-palette-black);
    height: var(--tap-sys-spacing-12);
    border-radius: var(--tap-sys-radius-5);
    display: flex;
  }

  .${gradientRed} {
    --nps-gradient-color: var(--tap-palette-red-100);
  }

  .${gradientGreen} {
    --nps-gradient-color: var(--tap-palette-green-100);
  }

  .${gradientGray} {
    --nps-gradient-color: var(--tap-palette-gray-100);
  }

  .${gradientYellow} {
    --nps-gradient-color: var(--tap-palette-yellow-100);
  }

  .${gradient} {
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

  .${gradient}::after {
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

  .${gradientRounded} {
    border-radius: var(--tap-sys-radius-5);
  }

  .${rateWrapper} {
    position: relative;
    width: 100%;
    display: flex;
    align-items: stretch;
  }

  .${rate} {
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

  .${label} {
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

  .${slider} {
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

  .${dot} {
    transition: transform 0.1s;
    width: 3px;
    height: 3px;
    background-color: var(--tap-sys-color-content-disabled);
    border-radius: var(--tap-sys-radius-full);
  }

  .${dotSelected} {
    transform: scale(2);
    background-color: var(--tap-palette-black);
  }
`;

import { css } from "lit";
import { FOCUS_RING_LINE, FOCUS_RING_OFFSET } from "../internals";

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    display: inline-block;
    vertical-align: middle;
  }

  :host([disabled]) {
    cursor: not-allowed;
  }

  .root.disabled {
    --rate-slider-gradient: var(--tap-sys-color-surface-disabled);
    --rate-slider-border-color: var(--tap-sys-color-content-disabled);
    --rate-slider-selected-dot-color: var(--tap-sys-color-content-tertiary);
    --rate-slider-tooltip-color: var(--tap-sys-color-content-tertiary);

    pointer-events: none;
    user-select: none;
  }

  .root.disabled .gradient {
    --rate-slider-gradient: var(--tap-sys-color-surface-disabled);
  }

  .root.disabled .gradient::after {
    display: none;
  }

  .root.unselected:focus-visible {
    outline: ${FOCUS_RING_LINE};
    outline-offset: ${FOCUS_RING_OFFSET};
  }

  .root {
    --rate-slider-gradient: transparent;
    --rate-slider-border-color: var(--tap-sys-color-border-inverse-primary);
    --rate-slider-selected-dot-color: var(--tap-sys-color-content-primary);
    --rate-slider-tooltip-color: var(--tap-sys-color-surface-inverse-secondary);

    direction: ltr;

    display: flex;
    align-items: center;

    position: relative;

    height: 4rem;
    border-radius: var(--tap-sys-radius-5);

    font-family: var(--tap-sys-font-family);

    outline: none;
    user-select: none;

    box-shadow: 0 0 0 var(--tap-sys-stroke-1) var(--rate-slider-border-color);
  }

  .gradient {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 0;

    background: var(--rate-slider-gradient);
    border-radius: var(--tap-sys-radius-5) 0 0 var(--tap-sys-radius-5);

    transition: background 120ms ease;
  }

  .gradient.red {
    --rate-slider-gradient: var(--tap-palette-red-100);
  }

  .gradient.green {
    --rate-slider-gradient: var(--tap-palette-green-100);
  }

  .gradient.gray {
    --rate-slider-gradient: var(--tap-palette-gray-100);
  }

  .gradient.yellow {
    --rate-slider-gradient: var(--tap-palette-yellow-100);
  }

  .gradient::after {
    content: "";

    position: absolute;
    inset: 0;

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

  .stops {
    display: flex;
    align-items: center;

    width: 100%;
    height: 100%;

    z-index: 1;
  }

  .stops > .stop:first-child {
    padding-left: var(--tap-sys-spacing-6);
  }

  .stops > .stop:last-child {
    padding-right: var(--tap-sys-spacing-6);
  }

  .stop {
    height: 100%;

    cursor: pointer;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    padding-right: var(--tap-sys-spacing-4);
    padding-left: var(--tap-sys-spacing-4);

    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;
    min-width: 0;

    color: var(--tap-sys-color-content-disabled);

    font-size: var(--tap-sys-typography-label-sm-size);
    line-height: var(--tap-sys-typography-label-sm-height);
    font-weight: var(--tap-sys-typography-label-sm-weight);
  }

  .stop::after {
    content: "";

    flex-shrink: 0;

    width: 0.1875rem;
    height: 0.1875rem;
    border-radius: 50%;

    position: absolute;
    visibility: hidden;

    background-color: var(--tap-sys-color-content-disabled);
  }

  .value-tooltip {
    position: absolute;

    visibility: hidden;
    opacity: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 1.75rem;
    max-height: 1.75rem;

    z-index: 1;
    transform: translateY(calc(-50% - 8px));

    background-color: var(--rate-slider-tooltip-color);
    color: var(--tap-sys-color-content-on-inverse);
    border-radius: var(--tap-sys-radius-3);

    font-size: var(--tap-sys-typography-label-lg-size);
    line-height: var(--tap-sys-typography-label-lg-height);
    font-weight: var(--tap-sys-typography-label-lg-weight);
  }

  .root:not(.unselected):focus-visible .stop.selected {
    outline: ${FOCUS_RING_LINE};
    outline-offset: ${FOCUS_RING_OFFSET};
  }

  .stop.selected .value-tooltip {
    visibility: visible;
    opacity: 1;
  }

  .stop.selected > .value-display {
    visibility: hidden;
  }

  .stop.selected::after {
    width: 0.375rem;
    height: 0.375rem;

    background-color: var(--rate-slider-selected-dot-color);
  }

  .root:not(.unselected) .stop:first-child:not(.selected) > .value-display,
  .root:not(.unselected) .stop:last-child:not(.selected) > .value-display {
    visibility: visible;
  }

  .root:not(.unselected) .stop:first-child:not(.selected)::after,
  .root:not(.unselected) .stop:last-child:not(.selected)::after {
    visibility: hidden;
  }

  .root:not(.unselected) .stop > .value-display {
    visibility: hidden;
  }

  .root:not(.unselected) .stop::after {
    visibility: visible;
  }
`;

export default styles;

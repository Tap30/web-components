import { css } from "lit";
import { Z_INDEXES } from "../internals";

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
    isolation: isolate;
    position: relative;
  }

  .root.open {
    visibility: visible;
    opacity: 1;
  }

  .root.open .container {
    transform: translateY(0) translateX(-50%);
  }

  .root {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    -moz-backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;

    z-index: ${Z_INDEXES[5]};
  }

  .container {
    overflow: hidden;
    z-index: 1;

    transform: translateY(calc(-1 * (100% + var(--tapsi-spacing-6))))
      translateX(-50%);

    position: fixed;
    left: 50%;
    top: var(--tapsi-spacing-6);

    background-color: var(--snackbar-background-color);
    font-family: var(--tapsi-font-family);
    border-radius: var(--tapsi-radius-full);

    transition: transform 240ms ease;

    display: flex;
    align-items: center;
    vertical-align: middle;

    min-width: 20.5rem;
    width: calc(100vw - var(--tapsi-spacing-9));
    max-width: 27.5rem;

    margin: auto;
  }

  .body {
    padding: 0.875rem;

    display: flex;
    align-items: center;
    vertical-align: middle;

    width: 100%;
  }

  .text {
    color: var(--snackbar-title-color);

    font-size: var(--tapsi-typography-body-md-size);
    font-weight: var(--tapsi-typography-body-md-weight);
    line-height: var(--tapsi-typography-body-md-height);

    flex: 1;

    padding: 0 0.875rem;
  }

  .root.inverse {
    --snackbar-icon-color: var(--tapsi-color-content-on-inverse);
    --snackbar-title-color: var(--tapsi-color-content-on-inverse);
    --snackbar-background-color: var(--tapsi-color-surface-inverse-primary);
  }

  .root.success {
    --snackbar-icon-color: var(--tapsi-color-content-on-inverse);
    --snackbar-title-color: var(--tapsi-color-content-on-inverse);
    --snackbar-background-color: var(--tapsi-color-surface-positive);
  }

  .root.warning {
    --snackbar-icon-color: var(--tapsi-color-content-primary);
    --snackbar-title-color: var(--tapsi-color-content-primary);
    --snackbar-background-color: var(--tapsi-color-surface-warning);
    --snackbar-description-color: var(--tapsi-color-content-secondary);
  }

  .root.error {
    --snackbar-icon-color: var(--tapsi-color-content-on-inverse);
    --snackbar-title-color: var(--tapsi-color-content-on-inverse);
    --snackbar-background-color: var(--tapsi-color-surface-negative);
  }

  .root.info {
    --snackbar-icon-color: var(--tapsi-color-content-on-inverse);
    --snackbar-title-color: var(--tapsi-color-content-on-inverse);
    --snackbar-background-color: var(--tapsi-color-surface-accent);
  }

  .icon {
    color: var(--snackbar-icon-color);
    height: var(--tapsi-spacing-8);
    width: var(--tapsi-spacing-8);

    flex-shrink: 0;
  }

  .dismiss {
    flex-shrink: 0;
  }

  .dismiss svg {
    color: var(--snackbar-title-color);
  }

  @media (prefers-reduced-motion) {
    .container {
      transition: none;
    }
  }
`;

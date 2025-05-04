import { css, type CSSResult } from "lit";
import { Z_INDEXES } from "../internals/index.ts";

const styles: CSSResult = css`
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
    transform: translateY(0);
  }

  .root.start .body {
    text-align: start;
  }

  .root.center {
    text-align: center;
  }

  .root {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    visibility: hidden;
    opacity: 0;

    -moz-backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;

    z-index: ${Z_INDEXES[5]};

    transition:
      visibility 240ms ease,
      opacity 240ms ease;
  }

  .overlay {
    background-color: var(--tapsi-color-surface-overlay-dark);

    position: fixed;
    inset: 0;

    z-index: -1;
  }

  .container {
    overflow: hidden;
    z-index: 1;
    position: relative;

    transform: translateY(2rem);

    position: fixed;
    left: var(--tapsi-spacing-6);
    right: var(--tapsi-spacing-6);
    bottom: var(--tapsi-spacing-6);

    background-color: var(--tapsi-color-surface-primary);
    font-family: var(--tapsi-typography-font-family);
    border-radius: var(--tapsi-radius-6);

    transition: transform 240ms ease;
  }

  .body {
    margin-top: var(--tapsi-spacing-6);
    margin-bottom: var(--tapsi-spacing-6);
    padding: var(--tapsi-spacing-4) var(--tapsi-spacing-6);
  }

  .title {
    color: var(--tapsi-color-content-primary);

    font-size: var(--tapsi-typography-headline-sm-size);
    font-weight: var(--tapsi-typography-headline-sm-weight);
    line-height: var(--tapsi-typography-headline-sm-height);
  }

  .description {
    color: var(--tapsi-color-content-tertiary);

    font-size: var(--tapsi-typography-body-md-size);
    font-weight: var(--tapsi-typography-body-md-weight);
    line-height: var(--tapsi-typography-body-md-height);
  }

  .title + .description {
    margin-top: var(--tapsi-spacing-4);
  }

  .actions {
    padding: var(--tapsi-spacing-6);
  }

  .actions ::slotted(*) {
    width: 100%;
  }

  @media (prefers-reduced-motion) {
    .root,
    .container {
      transition: none;
    }
  }
`;

export default styles;

import { css } from "lit";

export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  [hidden] {
    display: none !important;
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

    visibility: hidden;
    opacity: 0;

    transition:
      visibility 240ms ease,
      opacity 240ms ease;
  }

  .overlay {
    background-color: var(--tap-sys-color-surface-overlay-dark);

    position: fixed;
    inset: 0;
  }

  .container {
    transform: translateY(2rem);

    position: fixed;
    left: var(--tap-sys-spacing-6);
    right: var(--tap-sys-spacing-6);
    bottom: var(--tap-sys-spacing-6);

    background-color: var(--tap-sys-color-surface-primary);
    font-family: var(--tap-sys-font-family);
    border-radius: var(--tap-sys-radius-6);
    overflow: hidden;

    transition: transform 240ms ease;
  }

  .body {
    margin-top: var(--tap-sys-spacing-6);
    margin-bottom: var(--tap-sys-spacing-6);
    padding: var(--tap-sys-spacing-4) var(--tap-sys-spacing-6);
  }

  .title {
    color: var(--tap-sys-color-content-primary);

    font-size: var(--tap-sys-typography-headline-sm-size);
    font-weight: var(--tap-sys-typography-headline-sm-weight);
    line-height: var(--tap-sys-typography-headline-sm-height);
  }

  .description {
    color: var(--tap-sys-color-content-tertiary);

    font-size: var(--tap-sys-typography-body-md-size);
    font-weight: var(--tap-sys-typography-body-md-weight);
    line-height: var(--tap-sys-typography-body-md-height);
  }

  .title + .description {
    margin-top: var(--tap-sys-spacing-4);
  }

  .actions {
    padding: var(--tap-sys-spacing-6);
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

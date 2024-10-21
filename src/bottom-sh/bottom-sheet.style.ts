import { css } from "lit";
import { Z_INDEXES } from "../internals";

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .root {
    --bottom-sheet-dy: 100%;

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    opacity: 0;
    visibility: hidden;

    -moz-backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;

    z-index: ${Z_INDEXES[5]};

    transition:
      opacity 240ms ease,
      visibility 240ms ease;
  }

  .root.open {
    --bottom-sheet-dy: 0;

    opacity: 1;
    visibility: visible;
  }

  .root:not(.has-body) .body {
    display: none;
  }

  .root:not(.has-action-bar) .action-bar {
    display: none;
  }

  .root.has-action-bar.has-body .action-bar {
    margin-top: calc(-1 * var(--tap-sys-spacing-9));
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: -1;

    background-color: var(--tap-sys-color-surface-overlay-light);
  }

  .container {
    transform: translateY(var(--bottom-sheet-dy));
    transition: transform 240ms ease;
  }

  .header {
    position: relative;

    display: flex;
    flex-direction: column;

    padding: var(--tap-sys-spacing-5) var(--tap-sys-spacing-6);

    border-top-left-radius: var(--tap-sys-radius-5);
    border-top-right-radius: var(--tap-sys-radius-5);

    box-shadow: inset 0 -1px 0 0 var(--tap-sys-color-border-primary);
    background-color: var(--tap-sys-color-surface-primary);
  }

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .heading {
    margin-right: auto;
    margin-left: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .heading-title {
    font-family: var(--tap-sys-typography-label-md-font);
    font-size: var(--tap-sys-typography-label-md-size);
    line-height: var(--tap-sys-typography-label-md-height);
    font-weight: var(--tap-sys-typography-label-md-weight);
    color: var(--tap-sys-color-content-primary);
  }

  .heading-description {
    font-family: var(--tap-sys-typography-body-sm-font);
    font-size: var(--tap-sys-typography-body-sm-size);
    line-height: var(--tap-sys-typography-body-sm-height);
    font-weight: var(--tap-sys-typography-body-sm-weight);
    color: var(--tap-sys-color-content-tertiary);
  }

  .dismiss {
  }

  .dismiss-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    vertical-align: middle;

    color: var(--tap-sys-color-content-primary);
  }

  .dismiss-icon > svg {
    width: 20px;
    height: 20px;

    fill: currentColor;
  }

  .grabber {
    cursor: grab;

    height: 12px;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .grabber::after {
    content: "";
    display: block;

    width: 44px;
    height: 4px;

    border-radius: var(--tap-sys-radius-full);

    background-color: var(--tap-sys-color-surface-overlay-light);
  }

  .body {
    padding-top: var(--tap-sys-spacing-6);
    padding-bottom: var(--tap-sys-spacing-9);

    background-color: var(--tap-sys-color-surface-primary);
  }

  .action-bar {
    padding: var(--tap-sys-spacing-6);

    box-shadow: inset 0 1px 0 0 var(--tap-sys-color-border-primary);
    background-color: var(--tap-sys-color-surface-primary);
  }
`;

export default styles;

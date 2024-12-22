import { css } from "lit";
import { Z_INDEXES } from "../../internals";

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  [hidden] {
    display: none !important;
  }

  .root {
    --bottom-sheet-action-bar-position: relative;
    --bottom-sheet-grabber-height: 0.75rem;
    --bottom-sheet-grabber-y: 0;
    --bottom-sheet-grabber-bottom: 0;

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
    opacity: 1;
    visibility: visible;
  }

  .root.sticky-action-bar {
    --bottom-sheet-action-bar-position: sticky;
  }

  .root.expanded-grabber {
    --bottom-sheet-grabber-height: 1.25rem;
    --bottom-sheet-grabber-y: 50%;
    --bottom-sheet-grabber-bottom: 50%;
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
    height: 0;

    overflow: auto;
    z-index: 1;
    position: relative;

    border-top-left-radius: var(--tap-sys-radius-5);
    border-top-right-radius: var(--tap-sys-radius-5);

    background-color: var(--tap-sys-color-surface-primary);

    touch-action: pan-y;

    transition:
      transform 240ms ease,
      height 240ms ease;
  }

  .container.prevent-scroll {
    overflow: hidden;
  }

  .grabber {
    position: -webkit-sticky;
    position: sticky;
    top: 0;

    z-index: 3;

    height: var(--bottom-sheet-grabber-height);
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--tap-sys-color-surface-primary);

    transition: height 240ms ease;
  }

  .grabber-event-capturer {
    cursor: grab;

    display: block;
    appearance: none;

    width: 100%;
    height: calc(100% + 32px);
  }

  .grabber::after {
    content: "";
    display: block;

    position: absolute;
    bottom: var(--bottom-sheet-grabber-bottom);
    transform: translateY(var(--bottom-sheet-grabber-y));

    width: 2.75rem;
    height: 0.25rem;

    border-radius: var(--tap-sys-radius-full);

    background-color: var(--tap-sys-color-surface-overlay-light);

    transition:
      bottom 240ms ease,
      transform 240ms ease;
  }

  .header {
    position: relative;
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: var(--tap-sys-spacing-5) var(--tap-sys-spacing-6);

    box-shadow: inset 0 -1px 0 0 var(--tap-sys-color-border-primary);
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

  .action-bar {
    position: var(--bottom-sheet-action-bar-position);
    bottom: 0;

    z-index: 2;
    padding: var(--tap-sys-spacing-6);

    background-color: var(--tap-sys-color-surface-primary);
    box-shadow: inset 0 1px 0 0 var(--tap-sys-color-border-primary);
  }

  .header + .body {
    margin-top: var(--tap-sys-spacing-6);
  }

  .body + .action-bar {
    margin-top: var(--tap-sys-spacing-6);
  }
`;

export default styles;

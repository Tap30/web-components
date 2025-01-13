import { css } from "lit";
import { Z_INDEXES } from "../internals";

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  [hidden] {
    display: none !important;
  }

  :host {
    --bottom-sheet-action-bar-position: relative;
    --bottom-sheet-header-position: relative;
    --bottom-sheet-header-top: 0;
    --bottom-sheet-grabber-height: 0.75rem;
    --bottom-sheet-grabber-y: 0;
    --bottom-sheet-grabber-bottom: 0;

    isolation: isolate;
    position: relative;
  }

  .root {
    position: absolute;
    top: 0;
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

  .root.sticky-header {
    --bottom-sheet-header-position: sticky;
  }

  .root.expanded-grabber {
    --bottom-sheet-grabber-height: 1.25rem;
    --bottom-sheet-grabber-y: 50%;
    --bottom-sheet-grabber-bottom: 50%;
  }

  .root.has-grabber.sticky-header {
    --bottom-sheet-header-top: var(--bottom-sheet-grabber-height);
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: -1;

    background-color: var(--tapsi-color-surface-overlay-light);
  }

  .container {
    height: 0;

    overflow: auto;
    z-index: 1;

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;

    border-top-left-radius: var(--tapsi-radius-5);
    border-top-right-radius: var(--tapsi-radius-5);

    background-color: var(--tapsi-color-surface-primary);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.2);

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
    background-color: var(--tapsi-color-surface-primary);
    flex-shrink: 0;

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

    border-radius: var(--tapsi-radius-full);

    background-color: var(--tapsi-color-surface-overlay-light);

    transition:
      bottom 240ms ease,
      transform 240ms ease;
  }

  .header {
    position: var(--bottom-sheet-header-position);
    top: var(--bottom-sheet-header-top);

    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: var(--tapsi-spacing-5) var(--tapsi-spacing-6);

    background-color: var(--tapsi-color-surface-primary);
    box-shadow: inset 0 -1px 0 0 var(--tapsi-color-border-primary);
  }

  .heading {
    margin-right: auto;
    margin-left: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .root.has-dismiss-btn .heading {
    padding-right: var(--tapsi-spacing-9);
  }

  .heading-title {
    font-family: var(--tapsi-typography-label-md-font);
    font-size: var(--tapsi-typography-label-md-size);
    line-height: var(--tapsi-typography-label-md-height);
    font-weight: var(--tapsi-typography-label-md-weight);
    color: var(--tapsi-color-content-primary);
  }

  .heading-description {
    font-family: var(--tapsi-typography-body-sm-font);
    font-size: var(--tapsi-typography-body-sm-size);
    line-height: var(--tapsi-typography-body-sm-height);
    font-weight: var(--tapsi-typography-body-sm-weight);
    color: var(--tapsi-color-content-tertiary);
  }

  .dismiss-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    vertical-align: middle;

    color: var(--tapsi-color-content-primary);
  }

  .dismiss-icon > svg {
    width: 20px;
    height: 20px;

    fill: currentColor;
  }

  .action-bar {
    margin-top: auto;

    position: var(--bottom-sheet-action-bar-position);
    bottom: 0;

    z-index: 2;
    padding: var(--tapsi-spacing-6);

    background-color: var(--tapsi-color-surface-primary);
    box-shadow: inset 0 1px 0 0 var(--tapsi-color-border-primary);
  }

  .action-bar ::slotted(*) {
    width: 100%;
  }

  .body {
    padding-top: var(--tapsi-spacing-6);
    padding-bottom: var(--tapsi-spacing-9);
  }

  .root.has-body.has-action-bar .body {
    padding-bottom: var(--tapsi-spacing-6);
  }
`;

export default styles;

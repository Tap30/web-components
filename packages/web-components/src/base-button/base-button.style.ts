import { css } from "lit";

export default css`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }

  :host {
    cursor: pointer;
    display: inline-flex;
    user-select: none;
    text-overflow: ellipsis;
    place-content: center;
    place-items: center;
    position: relative;
    -webkit-tap-highlight-color: transparent;
  }

  :host([disabled]) {
    cursor: not-allowed;
    pointer-events: none;
  }

  .root.sm .content {
    --button-line-height: var(--tap-sys-typography-label-sm-height);
    --button-font-size: var(--tap-sys-typography-label-sm-size);
    --button-font-weight: var(--tap-sys-typography-label-sm-weight);
  }

  .root.md .content {
    --button-line-height: var(--tap-sys-typography-label-sm-height);
    --button-font-size: var(--tap-sys-typography-label-sm-size);
    --button-font-weight: var(--tap-sys-typography-label-sm-weight);
  }

  .root.lg .content {
    --button-line-height: var(--tap-sys-typography-label-lg-height);
    --button-font-size: var(--tap-sys-typography-label-lg-size);
    --button-font-weight: var(--tap-sys-typography-label-lg-weight);
  }

  .root.primary {
    --button-background: var(--tap-sys-color-surface-inverse-primary);
    --button-color: var(--tap-sys-color-content-on-inverse);
  }

  .root.ghost {
    --button-background: var(--tap-sys-color-surface-tertiary);
    --button-color: var(--tap-sys-color-content-primary);
  }

  .root.naked {
    --button-background: transparent;
    --button-color: var(--tap-sys-color-content-primary);
  }

  .root.elevated {
    --button-background: var(--tap-sys-color-surface-primary);
    --button-color: var(--tap-sys-color-content-primary);
    box-shadow: 0 4px 16px 0 #0000001a;
  }

  .root.destructive {
    --button-background: var(--tap-sys-color-surface-negative-light);
    --button-color: var(--tap-sys-color-content-negative);
  }

  .root.brand {
    --button-background: var(--tap-sys-color-gradient-brand);
    --button-color: var(--tap-sys-color-content-on-inverse);
  }

  .root:not(.naked):disabled {
    --button-background: var(--tap-sys-color-surface-disabled);
    --button-color: var(--tap-sys-color-content-disabled);
  }

  .root.naked:disabled {
    --button-background: transparent;
    --button-color: var(--tap-sys-color-content-disabled);
  }

  .root:not(.primary):active .overlay {
    --button-overlay-color: var(--tap-sys-color-surface-overlay-light);
  }

  .root.primary:active .overlay {
    --button-overlay-color: var(--tap-sys-color-surface-inverse-secondary);
  }

  .root {
    position: relative;
    cursor: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    vertical-align: middle;
    background: transparent;
    text-decoration: none;
    font: inherit;
    gap: inherit;
    width: 100%;
    background: var(--button-background);
    color: var(--button-color);
    font-family: var(--tap-font-family, var(--tap-sys-font-family));
    border-radius: var(--tap-sys-radius-full);
  }

  .overlay {
    opacity: 0;
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: var(--button-overlay-color);
    z-index: 1;
  }

  .root:active .overlay,
  .root:disabled .overlay {
    opacity: 1;
  }

  .spinner {
    position: absolute;
    display: flex;
    align-items: center;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }

  .content {
    line-height: var(--button-line-height);
    font-size: var(--button-font-size);
    font-weight: var(--button-font-weight);
    z-index: 2;
  }

  .root.loading .spinner {
    visibility: visible;
  }
  .root.loading .content {
    visibility: hidden;
  }
`;

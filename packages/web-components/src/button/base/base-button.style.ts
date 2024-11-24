import { css } from "lit";

export default css`
  :host,
  :host *,
  :host *::before,
  :host *::after {
    box-sizing: border-box;
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
  }

  .root.disabled {
    pointer-events: none;
  }

  .root.sm .icon {
    --button-icon-size: 1.25rem;
  }
  .root.md .icon {
    --button-icon-size: 1.5rem;
  }
  .root.lg .icon {
    --button-icon-size: 1.5rem;
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
    box-shadow: 0 0.25rem 1rem 0 #0000001a;
  }

  .root.destructive {
    --button-background: var(--tap-sys-color-surface-negative-light);
    --button-color: var(--tap-sys-color-content-negative);
  }

  .root.brand {
    --button-background: var(--tap-sys-color-gradient-brand);
    --button-color: var(--tap-sys-color-content-on-inverse);
  }

  .root:not(.naked).disabled {
    --button-background: var(--tap-sys-color-surface-disabled);
    --button-color: var(--tap-sys-color-content-disabled);
  }

  .root.naked.disabled {
    --button-background: transparent;
    --button-color: var(--tap-sys-color-content-disabled);
  }

  .root:not(.disabled):not(.primary):active .overlay {
    --button-overlay-color: var(--tap-sys-color-surface-overlay-light);
  }

  .root:not(.disabled).primary:active .overlay {
    --button-overlay-color: var(--tap-sys-color-surface-inverse-secondary);
  }

  .root {
    position: relative;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    vertical-align: middle;
    background: transparent;
    text-decoration: none;
    font: inherit;
    gap: 1rem;
    width: 100%;
    background: var(--button-background);
    color: var(--button-color);
    font-family: var(--tap-font-family, var(--tap-sys-font-family));
    border-radius: var(--tap-sys-radius-full);
  }

  .root:focus-visible {
    outline: 0.125rem solid var(--tap-sys-color-content-accent);
    outline-offset: 0.0625rem;
  }

  .overlay {
    opacity: 0;
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: var(--button-overlay-color);
    z-index: 1;
    transition: opacity 0.1s;
  }

  .root:active .overlay,
  .root.disabled .overlay {
    opacity: 1;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    height: var(--button-icon-size);
    max-height: var(--button-icon-size);
    width: var(--button-icon-size);
    max-width: var(--button-icon-size);
  }

  .icon ::slotted(*) {
    height: var(--button-icon-size);
    max-height: var(--button-icon-size);
    width: var(--button-icon-size);
    max-width: var(--button-icon-size);
  }

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

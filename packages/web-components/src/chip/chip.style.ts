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

  :host([disabled]) {
    cursor: not-allowed;
  }

  :host {
    display: inline-block;
  }

  .root.disabled {
    --chip-color: var(--tap-sys-color-content-disabled);

    pointer-events: none;
  }

  .root.selected {
    --chip-bg-color: var(--tap-sys-color-surface-secondary);
    --chip-stroke-color: var(--tap-sys-color-surface-inverse-primary);
  }

  .root.disabled.selected {
    --chip-stroke-color: var(--tap-sys-color-border-primary);
  }

  .root.has-trailing-icon {
    --chip-trailing-icon-display: flex;
  }

  .root.has-leading-icon {
    --chip-leading-icon-display: flex;
  }

  .root.sm {
    --chip-height: 2rem;
    --chip-icon-size: 1.25rem;
    --chip-spacing: var(--tap-sys-spacing-3-1);
  }

  .root.md {
    --chip-height: 2.5rem;
    --chip-icon-size: 1.5rem;
    --chip-spacing: var(--tap-sys-spacing-4);
  }

  .root:focus-visible {
    outline: 2px solid var(--tap-sys-color-content-accent);
    outline-offset: 1px;
  }

  .root {
    --chip-color: var(--tap-sys-color-content-primary);
    --chip-bg-color: var(--tap-sys-color-surface-primary);
    --chip-stroke-color: var(--tap-sys-color-border-primary);
    --chip-trailing-icon-display: none;
    --chip-leading-icon-display: none;

    cursor: pointer;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border-radius: var(--tap-sys-radius-full);
    border: var(--tap-sys-stroke-1) solid var(--chip-stroke-color);

    background-color: var(--chip-bg-color);
    color: var(--chip-color);

    padding: 0 var(--chip-spacing);
    min-width: 4.5rem;
    width: 100%;
    height: var(--chip-height);
  }

  .content {
    flex-shrink: 0;
    max-width: 100%;

    padding: 0 var(--chip-spacing);

    font-family: var(--tap-sys-font-family);
    font-size: var(--tap-sys-typography-body-sm-size);
    line-height: var(--tap-sys-typography-body-sm-height);

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .icon {
    align-items: center;
    justify-content: center;

    width: var(--chip-icon-size);
    height: var(--chip-icon-size);
    max-width: var(--chip-icon-size);
    max-height: var(--chip-icon-size);
    text-align: center;
  }

  .icon ::slotted(svg) {
    width: var(--chip-icon-size);
    height: var(--chip-icon-size);
    max-width: var(--chip-icon-size);
    max-height: var(--chip-icon-size);
  }

  .icon.leading-icon {
    display: var(--chip-leading-icon-display);
  }

  .icon.trailing-icon {
    display: var(--chip-trailing-icon-display);
  }
`;

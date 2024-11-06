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

  .root.disabled {
    --chip-color: var(--tap-sys-color-content-disabled);
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

  .root.small {
    --chip-height: 2rem;
    --chip-icon-size: 1.25rem;
    --chip-spacing: var(--tap-sys-spacing-3-1);
  }

  .root.medium {
    --chip-height: 2.5rem;
    --chip-icon-size: 1.5rem;
    --chip-spacing: var(--tap-sys-spacing-4);
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
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: 0 var(--chip-spacing);

    font-family: var(--tap-sys-font-family);
    font-size: var(--tap-sys-typography-body-sm-size);
    line-height: var(--tap-sys-typography-body-sm-height);
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

  .icon.leading-icon {
    display: var(--chip-leading-icon-display);
  }

  .icon.trailing-icon {
    display: var(--chip-trailing-icon-display);
  }
`;

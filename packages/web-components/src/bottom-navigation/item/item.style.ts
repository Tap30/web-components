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

  :host {
    display: inline-block;
  }

  .root.active {
    --item-color: var(--tap-sys-color-content-primary);
  }

  .root:focus-visible {
    outline: 2px solid var(--tap-sys-color-border-accent);
    outline-offset: 1px;
  }

  .root {
    --item-color: var(--tap-sys-color-content-tertiary);

    vertical-align: middle;

    cursor: pointer;
    user-select: none;
    border: none;
    outline: none;
    appearance: none;
    text-decoration: none;

    -webkit-tap-highlight-color: transparent;

    width: 100%;
    height: 100%;

    position: relative;
    vertical-align: middle;

    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: transparent;
    color: var(--item-color);
  }

  .icon {
    color: currentColor;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 1.5rem;
    height: 1.5rem;
    max-width: 1.5rem;
    max-height: 1.5rem;
    font-size: 1.5rem;
  }

  .content {
    color: currentColor;
    font-family: var(--tap-sys-font-family);
    line-height: var(--tap-sys-typography-label-xs-height);
    font-size: var(--tap-sys-typography-label-xs-size);
    font-weight: var(--tap-sys-typography-label-xs-weight);
  }
`;

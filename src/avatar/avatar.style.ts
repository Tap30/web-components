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

  .avatar {
    background-color: var(--tap-sys-color-surface-secondary);
    border: 1px solid var(--tap-sys-color-border-primary);
    border-radius: var(--tap-sys-radius-full);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .avatar[size="xxSmall"] {
    width: var(--tap-sys-spacing-8);
    height: var(--tap-sys-spacing-8);
  }

  .avatar[size="xSmall"] {
    width: var(--tap-sys-spacing-9);
    height: var(--tap-sys-spacing-9);
  }

  .avatar[size="small"] {
    width: var(--tap-sys-spacing-10);
    height: var(--tap-sys-spacing-10);
  }

  .avatar[size="medium"] {
    width: var(--tap-sys-spacing-11);
    height: var(--tap-sys-spacing-11);
  }

  // TODO: add to tokens
  .avatar[size="large"] {
    width: 56px;
    height: 56px;
  }

  // TODO: add to tokens
  .avatar[size="xLarge"] {
    width: 72px;
    height: 72px;
  }
`;

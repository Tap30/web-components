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
    width: var(--tap-sys-spacing-11);
    height: var(--tap-sys-spacing-11);
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
`;

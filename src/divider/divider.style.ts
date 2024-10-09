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
    display: block;
    background-color: var(
      --tap-divider-background-color,
      var(--tap-sys-color-border-primary)
    );
    width: 100%;
    margin: var(--tap-divider-margin, var(--tap-sys-spacing-4)) 0;
  }

  :host([type="thin"]) {
    height: var(--tap-divider-thin-height, var(--tap-sys-spacing-1));
  }

  :host([type="medium"]) {
    height: var(--tap-divider-medium-height, var(--tap-sys-spacing-2));
  }

  :host([type="bold"]) {
    background-color: var(
      --tap-divider-bold-background-color,
      var(--tap-sys-color-surface-secondary)
    );
    height: var(--tap-divider-bold-height, var(--tap-sys-spacing-4));
  }
`;

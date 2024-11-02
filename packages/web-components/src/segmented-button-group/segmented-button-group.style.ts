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

  .button-group {
    display: flex;
    background-color: var(
      --tap-segmented-button-group-color-surface,
      var(--tap-sys-color-surface-secondary)
    );
    border-radius: var(
      --tap-segmented-button-group-border-radius,
      var(--tap-sys-radius-full)
    );
    padding: var(
      --tap-segmented-button-group-padding,
      var(--tap-sys-spacing-3)
    );
  }

  :host([size="sm"]) .button-group {
    height: var(
      --tap-segmented-button-group-sm-height,
      var(--tap-sys-spacing-10)
    );
  }

  :host([size="md"]) .button-group {
    height: var(
      --tap-segmented-button-group-md-height,
      var(--tap-sys-spacing-11)
    );
  }
`;

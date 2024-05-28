import { css } from 'lit';

// tokens
// --tap-dialog-color-surface-overlay
// --tap-dialog-color-surface-primary
// --tap-dialog-padding
// --tap-dialog-radius

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
  .overlay {
    background-color: var(
      --tap-dialog-color-surface-overlay,
      var(--tap-sys-color-surface-overlay-dark)
    );
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .dialog {
    position: fixed;
    left: var(--tap-sys-spacing-6);
    right: var(--tap-sys-spacing-6);
    bottom: var(--tap-sys-spacing-6);
    background-color: var(
      --tap-dialog-color-surface-primary,
      var(--tap-sys-color-surface-primary)
    );
    padding: var(--tap-dialog-padding, var(--tap-sys-spacing-6));
    border-radius: var(--tap-dialog-radius, var(--tap-sys-radius-6));
  }
`;

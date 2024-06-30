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
    left: var(--tap-dialog-left, var(--tap-sys-spacing-6));
    right: var(--tap-dialog-right, var(--tap-sys-spacing-6));
    bottom: var(--tap-dialog-bottom, var(--tap-sys-spacing-6));
    background-color: var(
      --tap-dialog-color-surface-primary,
      var(--tap-sys-color-surface-primary)
    );
    font-family: var(--tap-dialog-font, var(--tap-sys-font-family));
    border-radius: var(--tap-dialog-radius, var(--tap-sys-radius-6));
    overflow: hidden;
  }

  .icon-container {
    margin-top: var(--tap-dialog-icon-top-margin, var(--tap-sys-spacing-8));
    display: flex;
    justify-content: center;
  }

  .image-container {
    height: 200px;
    background-color: var(
      --tap-dialog-image-container-background-color,
      var(--tap-palette-gray-100)
    );
  }

  ::slotted([slot='banner']) {
    width: 100%;
    height: 100%;
  }

  .content {
    padding: var(
        --tap-dialog-content-vertical-padding,
        var(--tap-sys-spacing-4)
      )
      var(--tap-dialog-content-horizontal-padding, var(--tap-sys-spacing-6));
    margin: var(--tap-dialog-content-vertical-margin, var(--tap-sys-spacing-6))
      var(--tap-dialog-content-horizontal-margin, 0);
  }

  .center {
    text-align: center;
  }

  .right {
    text-align: right;
  }
  
  .left {
    text-align: left;
  }

  .left {
    text-align: left;
  }

  .title {
    font-size: var(
      --tap-dialog-title-size,
      var(--tap-sys-typography-headline-sm-size)
    );
    font-weight: var(
      --tap-dialog-title-weight,
      var(--tap-sys-typography-headline-sm-weight)
    );
    line-height: var(
      --tap-dialog-title-line-height,
      var(--tap-sys-typography-headline-sm-height)
    );
  }

  .description {
    margin: var(--tap-dialog-description-margin, 0);
    padding-top: var(
      --tap-dialog-description-padding-top,
      var(--tap-sys-spacing-4)
    );
    font-size: var(
      --tap-dialog-description-font-size,
      var(--tap-sys-typography-body-md-size)
    );
    font-weight: var(
      --tap-dialog-description-font-weight,
      var(--tap-sys-typography-body-md-weight)
    );
    line-height: var(
      --tap-dialog-description-line-height,
      var(--tap-sys-typography-body-md-height)
    );
    color: var(--tap-dialog-description-color, var(--tap-palette-gray-500));
  }

  .actions {
    padding: var(--tap-dialog-actions-padding, var(--tap-sys-spacing-6));
  }
`;

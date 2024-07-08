import {css} from 'lit';

export default css`
  :host {
    --tap-pin-input-cell-box-sizing: border-box;
    --tap-pin-input-cell-height: 52px;
    --tap-pin-input-cell-max-cell-width-ratio: 1.25;

    --tap-pin-input-cell-font-family: var(--tap-sys-font-family);
    --tap-pin-input-cell-font-size-small: var(--tap-sys-typography-headline-xs-size, 16px);
    --tap-pin-input-cell-font-size-medium: var(--tap-sys-typography-headline-sm-size, 20px);
    --tap-pin-input-cell-font-size-large: var(--tap-sys-typography-headline-md-size, 24px);

    --tap-pin-input-cell-font-weight-small: var(--tap-sys-typography-headline-xs-weight, 600);
    --tap-pin-input-cell-font-weight-medium: var(--tap-sys-typography-headline-sm-weight, 600);
    --tap-pin-input-cell-font-weight-large: var(--tap-sys-typography-headline-md-weight, 600);

    --tap-pin-input-cell-line-height-small: var(--tap-sys-typography-headline-xs-height, 26px);
    --tap-pin-input-cell-line-height-medium: var(--tap-sys-typography-headline-sm-height, 32px);
    --tap-pin-input-cell-line-height-large: var(--tap-sys-typography-headline-md-height, 36px);

    --tap-pin-input-cell-padding-small: var(--tap-sys-spacing-3, 6px);
    --tap-pin-input-cell-padding-medium: var(--tap-sys-spacing-4, 8px);
    --tap-pin-input-cell-padding-large: var(--tap-sys-spacing-5, 12px);

    --tap-pin-input-cell-bg-color: var(--tap-palette-gray-100);
    --tap-pin-input-cell-error-bg-color: var(--tap-palette-red-50);
    --tap-pin-input-cell-disabled-bg-color: var(--tap-sys-color-surface-disabled);
    --tap-pin-input-cell-color: var(--tap-palette-black);
    --tap-pin-input-cell-disabled-color: var(--tap-sys-color-content-disabled);

    --tap-pin-input-cell-border-focus-color: var(--tap-sys-color-border-focus);
    --tap-pin-input-cell-border-error-color: var(--tap-sys-color-border-negative);
    --tap-pin-input-cell-border-disabled-color: transparent;
    --tap-pin-input-cell-border-radius: var(--tap-sys-radius-3);
    --tap-pin-input-cell-border-width: var(--tap-sys-stroke-4);
    --tap-pin-input-cell-border-default-color: transparent;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: var(--tap-pin-input-cell-box-sizing, inherit);
  }

  [hidden] {
    display: none !important;
  }

  .cell {
    border: none;
    padding: 0;
    margin: 0;
    background-color: var(--tap-pin-input-cell-bg-color);
    color: var(--tap-pin-input-cell-color);
    border: var(--tap-pin-input-cell-border-width) solid var(--tap-pin-input-cell-border-default-color);
    border-radius: var(--tap-pin-input-cell-border-radius);
    outline: none;
    min-width: 0;
    text-align: center;
    font-family: var(--tap-pin-input-cell-font-family);
    min-width: var(--tap-pin-input-cell-height);
    max-width: calc(
      var(--tap-pin-input-cell-height) *
      var(--tap-pin-input-cell-max-cell-width-ratio)
    );
  }

  .cell[disabled] {
    border-color: var(--tap-pin-input-cell-border-disabled-color);
    background-color: var(--tap-pin-input-cell-disabled-bg-color);
    color: var(--tap-pin-input-cell-border-disabled-color);
    user-select: none;
    pointer-events: none;
  }

  .cell:focus {
    border-color: var(--tap-pin-input-cell-border-focus-color);
  }

  .cell.cell-sm {
    padding: var(--tap-pin-input-cell-padding-small);
    font-size: var(--tap-pin-input-cell-font-size-small);
    font-weight: var(--tap-pin-input-cell-font-weight-small);
    line-height: var(--tap-pin-input-cell-line-height-small);
  }

  .cell.cell-md {
    padding: var(--tap-pin-input-cell-padding-medium);
    font-size: var(--tap-pin-input-cell-font-size-medium);
    font-weight: var(--tap-pin-input-cell-font-weight-medium);
    line-height: var(--tap-pin-input-cell-line-height-medium);
  }

  .cell.cell-lg {
    padding: var(--tap-pin-input-cell-padding-large);
    font-size: var(--tap-pin-input-cell-font-size-large);
    font-weight: var(--tap-pin-input-cell-font-weight-large);
    line-height: var(--tap-pin-input-cell-line-height-large);
  }

  .cell.has-error {
    background-color: var(--tap-pin-input-cell-error-bg-color);
    border-color: var(--tap-pin-input-cell-error-bg-color);
  }
`;

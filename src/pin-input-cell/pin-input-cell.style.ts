import { css } from 'lit';

export default css`
  :host {
    box-sizing: border-box;
    --height: var(--tap-pin-input-cell-height, 52px);
    --bg-color: var(--tap-pin-input-cell-bg-color, #eaeded);
    --error-bg-color: var(--tap-pin-input-cell-error-bg-color, #ffefed);
    --disabled-bg-color: var(
      --tap-pin-input-cell-disabled-bg-color,
      var(--tap-sys-color-surface-disabled)
    );
    --color: var(--tap-pin-input-cell-color, #000);
    --disabled-color: var(
      --tap-pin-input-cell-disabled-color,
      var(--tap-sys-color-content-disabled)
    );
    --border-radius: var(--tap-pin-input-cell-border-radius, 8px);
    --border-width: var(--tap-pin-input-cell-border-width, 2px);
    --border-default-color: var(
      --tap-pin-input-cell-border-default-color,
      transparent
    );
    --max-cell-width-ratio: var(
      --tap-pin-input-cell-max-cell-width-ratio,
      1.25
    );
    --border-focus-color: var(--tap-pin-input-cell-border-focus-color, #323333);
    --border-error-color: var(--tap-pin-input-cell-border-error-color, #f1998e);
    --border-disabled-color: var(
      --tap-pin-input-cell-border-disabled-color,
      transparent
    );

    --font-size-sm: var(--tap-pin-input-cell-font-size-small, 16px);
    --font-size-md: var(--tap-pin-input-cell-font-size-medium, 20px);
    --font-size-lg: var(--tap-pin-input-cell-font-size-large, 24px);

    --font-weight-sm: var(--tap-pin-input-cell-font-weight-small, 400);
    --font-weight-md: var(--tap-pin-input-cell-font-weight-medium, 600);
    --font-weight-lg: var(--tap-pin-input-cell-font-weight-large, 600);

    --line-height-sm: var(--tap-pin-input-cell-line-height-small, 26px);
    --line-height-md: var(--tap-pin-input-cell-line-height-medium, 32px);
    --line-height-lg: var(--tap-pin-input-cell-line-height-large, 36px);

    --padding-sm: var(--tap-pin-input-cell-padding-small, 6px);
    --padding-md: var(--tap-pin-input-cell-padding-medium, 8px);
    --padding-lg: var(--tap-pin-input-cell-padding-large, 12px);
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }

  .cell {
    border: none;
    padding: 0;
    margin: 0;
    background-color: var(--bg-color);
    color: var(--color);
    border: var(--border-width) solid var(--border-default-color);
    border-radius: var(--border-radius);
    outline: none;
    min-width: 0;
    text-align: center;
    font-family: var(--tap-sys-font-family);
    min-width: var(--height);
    max-width: calc(var(--height) * var(--max-cell-width-ratio));
  }

  .cell[disabled] {
    border-color: var(--border-disabled-color);
    background-color: var(--disabled-bg-color);
    color: var(--disabled-color);
    user-select: none;
    pointer-events: none;
  }

  .cell:focus {
    border-color: var(--border-focus-color);
  }

  .cell.cell-sm {
    padding: var(--padding-sm);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-sm);
    line-height: var(--line-height-sm);
  }

  .cell.cell-md {
    padding: var(--padding-md);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-md);
    line-height: var(--line-height-md);
  }

  .cell.cell-lg {
    padding: var(--padding-lg);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-lg);
    line-height: var(--line-height-lg);
  }

  .cell.has-error {
    background-color: var(--error-bg-color);
    border-color: var(--border-error-color);
  }
`;

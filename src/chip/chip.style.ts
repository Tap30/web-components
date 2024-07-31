import { css } from 'lit';

export default css`
  :host {
    box-sizing: border-box;
    flex: 1;
    // TODO: add to the tokens
    min-width: var(--tap-chip-min-width, 72px);
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }

  .chip {
    font: inherit;
    font-family: var(--tap-font-family, var(--tap-sys-font-family));
    font-size: var(
      --tap-chip-font-size,
      var(--tap-sys-typography-body-sm-size)
    );
    line-height: var(
      --tap-chip-line-height,
      var(--tap-sys-typography-body-sm-height)
    );
    border-radius: var(--tap-chip-border-radius, var(--tap-sys-radius-full));
    border: 1px solid;
    border-color: var(
      --tap-chip-border-color,
      var(--tap-sys-color-border-primary)
    );
    background-color: var(
      --tap-chip-background-color,
      var(--tap-sys-color-surface-primary)
    );
    color: var(--tap-chip-color, var(--tap-sys-color-content-primary));
    padding: 0 var(--tap-chip-horizontal-padding, var(--tap-sys-spacing-4));
    width: 100%;
    height: 100%;
    // TODO: add to the tokens
    min-width: var(--tap-chip-min-width, 72px);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  ::slotted([slot='icon']) {
    margin-left: var(--tap-chip-icon-left-margin, var(--tap-sys-spacing-4));
  }

  :host([hasicon]) .chip {
    justify-content: end;
  }

  :host([selected]) .chip {
    border: 1.5px solid;
    background-color: var(
      --tap-chip-selected-background-color,
      var(--tap-sys-color-surface-secondary)
    );
    border-color: var(
      --tap-chip-selected-border-color,
      var(--tap-sys-color-surface-inverse-primary)
    );
  }

  :host([disabled]) .chip {
    color: var(
      --tap-chip-disabled-color,
      var(--tap-sys-color-content-disabled)
    );
  }

  :host([selected]),
  :host([disabled]) .chip {
    border-color: var(
      --tap-chip-selected-and-disabled-color,
      var(--tap-sys-color-border-primary)
    );
  }
`;

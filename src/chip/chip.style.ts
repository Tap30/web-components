import { css } from 'lit';

export default css`
  :host {
    box-sizing: border-box;
    width: 100%;
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
    display: flex;
    align-items: center;
    justify-content: center;
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
    // TODO: add to the tokens
    min-width: var(--tap-chip-min-width, 72px);
  }

  ::slotted([slot='icon']),
  .chip {
    gap: var(--tap-chip-icon-gap, var(--tap-sys-spacing-4));
  }

  :host([hasicon]) .chip {
    display: flex;
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

  :host([size='sm']) .chip {
    height: var(--tap-chip-group-sm-height, var(--tap-sys-spacing-9));
  }

  :host([size='md']) .chip {
    height: var(--tap-chip-group-md-height, var(--tap-sys-spacing-10));
  }
`;

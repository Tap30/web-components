import { css } from 'lit';

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
    position: relative;
    display: inline-flex;
    vertical-align: top;
    border-radius: var(--tap-sys-radius-1);
    height: var(--tap-sys-spacing-7);
    width: var(--tap-sys-spacing-7);
    background-color: var(--tap-sys-color-surface-primary);
    border: 1px solid var(--tap-sys-color-border-inverse-primary);
    cursor: pointer;
    align-items: center;
    justify-content: center;
  }

  :host([checked]),
  :host([indeterminate]) {
    background-color: var(--tap-sys-color-surface-inverse-primary);
    color: var(--tap-sys-color-content-on-inverse);
  }

  :host([disabled]) {
    background-color: var(--tap-sys-color-surface-disabled);
    border-color: var(--tap-sys-color-surface-disabled);
    color: var(--tap-sys-color-content-disabled);
  }

  .input {
    appearance: none;
    height: var(--tap-sys-spacing-7);
    width: var(--tap-sys-spacing-7);
    margin: 0;
    opacity: 0;
    outline: none;
    position: absolute;
    z-index: 1;
    cursor: inherit;
  }
`;

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

  .steps {
    display: flex;
    align-items: center;
  }

  .step {
    box-sizing: content-box;
    position: relative;
    cursor: inherit;
    display: inline-flex;
    outline: none;
    height: calc(var(--tap-sys-spacing-5) / 2);
    width: calc(var(--tap-sys-spacing-5) / 2);
    padding: 0;
    border-radius: var(--tap-sys-radius-full);
    border: calc(var(--tap-sys-spacing-5) / 4) solid
      var(--tap-sys-color-surface-primary);
    background-color: var(--tap-sys-color-border-primary);
  }

  .step[aria-current='step'] {
    background-color: var(--tap-sys-color-content-primary);
    width: var(--tap-sys-spacing-5);
  }
`;

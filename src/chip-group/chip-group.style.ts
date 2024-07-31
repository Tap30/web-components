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

  .chip-group {
    display: inline-flex;
    gap: var(--tap-chip-group-gap, var(--tap-sys-spacing-5));
    justify-content: space-between;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .chip-group::-webkit-scrollbar {
    display: none;
  }

  :host([fullwidth]) .chip-group {
    display: flex;
  }
`;

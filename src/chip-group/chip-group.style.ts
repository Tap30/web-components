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
    display: flex;
    gap: var(--tap-chip-group-gap, var(--tap-sys-spacing-5));
    justify-content: space-between;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .chip-group::-webkit-scrollbar {
    display: none;
  }

  :host([size='sm']) .chip-group {
    height: var(--tap-chip-group-sm-height, var(--tap-sys-spacing-9));
  }

  :host([size='md']) .chip-group {
    height: var(--tap-chip-group-md-height, var(--tap-sys-spacing-10));
  }
`;

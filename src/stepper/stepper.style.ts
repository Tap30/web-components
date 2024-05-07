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

  .stepper {
    display: inline-flex;
    user-select: none;
    text-overflow: ellipsis;
    place-content: space-between;
    place-items: center;
    position: relative;
    font-family: var(--tap-font-family, var(--tap-sys-font-family)), serif;
  }

  :host([fullWidth]) {
    width: 100%;
  }

  :host([size='small']) .stepper {
    gap: var(--tap-sys-spacing-4);
  }

  :host([size='medium']) .stepper {
    gap: var(--tap-sys-spacing-8);
  }
`;

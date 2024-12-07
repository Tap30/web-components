import { css } from "lit";

export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    display: inline-block;
    vertical-align: middle;
  }

  .root ::slotted(tap-segmented-view-item) {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
  }

  .root {
    background-color: var(--tap-sys-color-surface-secondary);

    border-radius: var(--tap-sys-radius-full);
    padding: var(--tap-sys-spacing-3);

    display: flex;
    align-items: center;
  }
`;

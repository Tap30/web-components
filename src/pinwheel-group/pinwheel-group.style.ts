import { css } from "lit";

export default css`
  :host {
    display: inline-flex;
  }

  .pinwheel-group {
    position: relative;
  }

  .selector-indicator {
    /* FIXME: we dont have sizing tokens yet */
    height: 48px;
    background-color: var(--tap-pinwheel-group-color-surface-tertiary, var(--tap-sys-color-surface-tertiary));
    border-radius: var(--tap-pinwheel-group-spacing-4, var(--tap-sys-spacing-4));
    position: absolute;
    top: calc(50% - 24px);
    left: 0;
    right: 0;
    z-index: -1;
  }
`;

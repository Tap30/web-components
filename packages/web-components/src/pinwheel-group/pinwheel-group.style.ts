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
    height: var(--tap-pinwheel-item-height, 48px);
    background-color: var(
      --tap-pinwheel-group-selector-background-color,
      var(--tap-sys-color-surface-tertiary)
    );
    border-radius: var(
      --tap-pinwheel-group-selector-radius,
      var(--tap-sys-spacing-4)
    );
    position: absolute;
    top: calc(50% - 24px);
    left: 0;
    right: 0;
    z-index: -1;
  }
`;

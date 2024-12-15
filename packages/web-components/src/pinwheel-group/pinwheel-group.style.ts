import { css } from "lit";

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    display: block;
  }

  .root {
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;

    width: 100%;
  }

  .root::after {
    content: "";

    position: absolute;

    width: calc(100% - var(--tap-sys-spacing-9));
    height: 3rem;
    z-index: -1;

    border-radius: var(--tap-sys-radius-3);

    background-color: var(--tap-sys-color-surface-tertiary);
  }

  .root ::slotted(tap-pinwheel) {
    flex: 1 1 0;
    min-width: 0;
  }
`;

export default styles;

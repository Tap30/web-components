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

    width: 100%;
    height: 3rem;
    z-index: -1;

    border-radius: var(--tapsi-radius-3);

    background-color: var(--tapsi-color-surface-tertiary);
  }

  .root ::slotted(tapsi-pinwheel) {
    flex: 1 1 0;
    min-width: 0;
  }
`;

export default styles;

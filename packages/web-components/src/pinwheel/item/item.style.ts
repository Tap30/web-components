import { css } from "lit";

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    display: inline-block;
    vertical-align: middle;
  }

  .root.selected {
    color: var(--tap-sys-color-content-primary);

    font-weight: 500;
  }

  .root {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 3rem;
    width: 100%;
    padding-right: var(--tap-sys-spacing-6);
    padding-left: var(--tap-sys-spacing-6);

    color: var(--tap-sys-color-content-tertiary);

    font-family: var(--tap-sys-font-family);

    font-size: var(--tap-sys-typography-body-md-size);
    line-height: var(--tap-sys-typography-body-md-height);
    font-weight: var(--tap-sys-typography-body-md-weight);
  }
`;

export default styles;

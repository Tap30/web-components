import { css } from "lit";

export default css`
  :host {
    display: inline-block;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  [hidden] {
    display: none !important;
  }

  .root {
    background-color: var(--tapsi-color-surface-secondary);
    box-shadow: 0 0 0 1px var(--tapsi-color-border-primary);
    border-radius: 50%;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    vertical-align: middle;
  }

  .image,
  .placeholder,
  .root ::slotted(svg) {
    width: 100%;
    height: 100%;

    border-radius: 50%;
  }

  .root.xs {
    width: 1.5rem;
    height: 1.5rem;
  }

  .root.sm {
    width: 2rem;
    height: 2rem;
  }

  .root.md {
    width: 2.5rem;
    height: 2.5rem;
  }

  .root.lg {
    width: 3rem;
    height: 3rem;
  }

  .root.xlg {
    width: 3.5rem;
    height: 3.5rem;
  }

  .root.xxlg {
    width: 4.5rem;
    height: 4.5rem;
  }
`;

import { css } from "lit";

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

  .radio-group {
    display: flex;
    padding: var(--tap-sys-spacing-3);
    gap: var(--tap-sys-spacing-3);
  }

  :host([direction="col"]) .radio-group {
    flex-direction: column;
  }

  :host([direction="row"]) .radio-group {
    flex-direction: row;
  }
`;

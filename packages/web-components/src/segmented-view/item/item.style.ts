import { css } from "lit";

export default css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  [hidden] {
    display: none !important;
  }

  :host {
    display: inline-block;
    vertical-align: middle;
  }

  .root {
    width: 100%;
  }
`;

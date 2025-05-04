import { css, type CSSResult } from "lit";

const styles: CSSResult = css`
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

export default styles;

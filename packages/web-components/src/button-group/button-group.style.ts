import { css, type CSSResult } from "lit";

const styles: CSSResult = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    display: inline-block;
    vertical-align: middle;
  }

  .root.fluid ::slotted(*) {
    flex-grow: 1;
    width: 100%;
  }

  .root.horizontal {
    flex-direction: row;
  }

  .root.vertical {
    flex-direction: column;
  }

  .root.start {
    align-items: flex-start;
  }

  .root.center {
    align-items: center;
  }

  .root {
    display: flex;
    flex-wrap: wrap;

    gap: var(--tapsi-spacing-4);
  }

  .root ::slotted(*) {
    flex-shrink: 0;
    flex-basis: 0;
  }
`;

export default styles;

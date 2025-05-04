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

  .root ::slotted(tapsi-segmented-view-item) {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
  }

  .root {
    background-color: var(--tapsi-color-surface-secondary);

    border-radius: var(--tapsi-radius-full);
    padding: var(--tapsi-spacing-3);

    display: flex;
    align-items: center;
  }
`;

export default styles;

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

    width: 100%;
    overflow: hidden;
  }

  .root.selected {
    color: var(--tapsi-color-content-primary);

    font-weight: 500;
  }

  .root {
    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;
    cursor: pointer;

    height: 3rem;
    width: 100%;
    padding-right: var(--tapsi-spacing-6);
    padding-left: var(--tapsi-spacing-6);

    color: var(--tapsi-color-content-tertiary);

    font-family: var(--tapsi-typography-font-family);

    font-size: var(--tapsi-typography-body-md-size);
    line-height: var(--tapsi-typography-body-md-height);
    font-weight: var(--tapsi-typography-body-md-weight);

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .root ::slotted(*) {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export default styles;

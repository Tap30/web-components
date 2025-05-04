import { css, type CSSResult } from "lit";

const styles: CSSResult = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    display: block;
  }

  .root ::slotted(tapsi-bottom-navigation-item) {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
  }

  .root {
    height: 4rem;

    background-color: var(--tapsi-color-surface-secondary);
    box-shadow: 0 calc(-1 * var(--tapsi-stroke-1)) 0 0
      var(--tapsi-color-border-primary);

    display: flex;
  }
`;

export default styles;

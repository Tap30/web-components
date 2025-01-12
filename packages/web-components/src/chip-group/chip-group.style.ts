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

  :host([full-width]) {
    width: 100%;
  }

  :host {
    display: inline-block;
  }

  .root.horizontal ::slotted(tapsi-chip) {
    flex-shrink: 0;
  }

  .root.vertical ::slotted(tapsi-chip) {
    --chip-basis: calc(
      (100% + (1 - var(--chips-cols)) * var(--tapsi-spacing-5)) /
        var(--chips-cols)
    );

    flex: 0 0 var(--chip-basis);
    max-width: var(--chip-basis);
  }

  .root.horizontal {
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .root.vertical {
    flex-wrap: wrap;
  }

  .root {
    display: inline-flex;
    align-items: center;

    width: 100%;

    gap: var(--tapsi-spacing-5);
  }

  .root::-webkit-scrollbar {
    display: none;
  }
`;

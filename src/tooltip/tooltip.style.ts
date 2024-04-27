import { css } from "lit";

export default css`
  .tooltip {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--tap-palette-gray-700);
    border-radius: var(--radius-8px, 8px);
  }

  .tooltip-label {
    color: vat(--tap-palette-white);
  }
`;

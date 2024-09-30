import {css} from "lit";

export default  css`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  .row {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 40px;
  }


  @media (max-width: 1100px) {
    .row {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

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

  .guideline-section {
    padding: 20px 0;
    min-height: 40vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .guideline-section.reverse {
    flex-direction: row-reverse;
  }

  .image {
    max-width: 30vw;
    min-width: 30vw;
  }

  .image img {
    width: 100%;
  }

  @media (max-width: 1100px) {
    .guideline-section {
      flex-direction: column;
      align-items: flex-start;
    }

    .guideline-section.reverse {
      flex-direction: column-reverse;
    }

    .image {
      max-width: unset;
      margin: auto;
    }
  }
`;

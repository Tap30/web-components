import { css } from "lit";

export default css`
  :host {
    box-sizing: border-box;
    flex: 1;
    align-self: stretch;
    display: flex;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  .guideline-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    border-radius: 8px;
    padding: 16px 16px 8px;
    line-height: 24px;
    font-size: var(--vp-custom-block-font-size);
    border-color: var(--vp-custom-block-info-border);
    color: var(--vp-custom-block-info-text);
    background-color: var(--vp-custom-block-info-bg);
  }

  .image {
    margin: auto;
  }
  .image img {
    width: 100%;
  }

  .badge {
    display: inline-block;
    margin-left: 2px;
    border: 1px solid transparent;
    height: 26px;
    border-radius: 12px;
    padding: 0 10px;
    font-size: 12px;
    font-weight: 500;
    transform: translateY(10px);
  }

  .do {
    background-color: var(--tap-palette-green-400);
    color: #ffffff;
  }
  .dont {
    background-color: var(--tap-palette-red-400);
    color: #ffffff;
  }
  .caution {
    background-color: var(--tap-palette-yellow-400);
    color: #000000;
  }

  @media (max-width: 1100px) {
    :host {
      width: 100%;
      align-items: stretch;
    }
    .guideline-card {
      width: 100%;
    }
  }
`;

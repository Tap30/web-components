import { css } from 'lit';

export default css`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }

  :host .container {
    background-color: var(--vp-custom-block-info-bg);
    border: 1px solid transparent;
    border-radius: 8px;
    padding: 16px 16px 8px;
    line-height: 24px;
    font-size: var(--vp-custom-block-font-size);
    margin: 16px 0;
  }

  :host .container .badge {
    background-color: var(--tap-palette-red-400);
    color: #ffffff;
    display: inline-block;
    margin-left: 2px;
    border: 1px solid transparent;
    border-radius: 12px;
    padding: 0 10px;
    line-height: 22px;
    font-size: 12px;
    font-weight: 500;
    transform: translateY(-2px);
  }
`;

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

  :host {
    flex: 1;
  }

  .bottom-navigation-item {
    height: 100%;
    width: 100%;
    cursor: pointer;
    display: inline-flex;
    user-select: none;
    flex-direction: column;
    text-overflow: ellipsis;
    place-content: center;
    place-items: center;
    position: relative;
    border: none;
    outline: none;
    vertical-align: middle;
    background: transparent;
    text-decoration: none;
    font: inherit;
    font-family: var(--tap-sys-font-family);
    color: var(--tap-sys-color-content-tertiary);
    line-height: var(--tap-sys-typography-label-xs-height);
    font-size: var(--tap-sys-typography-label-xs-size);
    font-weight: var(--tap-sys-typography-label-xs-weight);
  }

  :host([active]) .bottom-navigation-item {
    color: var(--tap-sys-color-content-primary);
  }
`;

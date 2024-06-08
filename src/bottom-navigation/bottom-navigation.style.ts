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

  .bottom-navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 72px;
    background: var(
      --tap-bottom-navigation-background,
      var(--tap-sys-color-surface-secondary)
    );
    border-top-width: var(
      --tap-bottom-navigation-border-top-width,
      var(--tap-sys-stroke-1)
    );
    border-top-style: solid;
    border-top-color: var(
      --tap-bottom-navigation-border-top-color,
      var(--tap-sys-color-border-primary)
    );
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
`;

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

  .button {
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    display: inline-flex;
    user-select: none;
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
    gap: inherit;
    font-family: var(--tap-sys-font-family);
    border-radius: var(--tap-sys-radius-full);
    color: var(--tap-sys-color-content-primary);
    line-height: var(--tap-sys-typography-label-sm-height);
    font-size: var(--tap-sys-typography-label-sm-size);
    font-weight: var(--tap-sys-typography-label-sm-weight);
  }

  :host([selected]) .button {
    background-color: var(--tap-sys-color-surface-primary);
    /* FIXME: we dont have shadow tokens yet  */
    box-shadow: 0px 4px 16px 0px #0000001a;
  }
`;

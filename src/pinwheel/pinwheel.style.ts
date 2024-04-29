import { css } from "lit";

export default css`
  :host {
    display: inline-flex;
    height: 144px;
    overflow: hidden;
    overflow-y: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  :host::-webkit-scrollbar {
    display: none;
  }

  div > div {
    padding: 0 16px;
    height: 48px;
    font: inherit;
    font-family: var(--tap-sys-font-family);
    line-height: var(--tap-sys-typography-body-md-height);
    font-size: var(--tap-sys-typography-body-md-size);
    font-weight: var(--tap-sys-typography-body-md-weight);
    color: var(--tap-sys-color-content-tertiary);
  }

  .pinwheel div:first-child {
    padding-top: 48px;
  }

  .pinwheel div:last-child {
    padding-bottom: 48px;
  }

  .active {
    line-height: var(--tap-sys-typography-label-md-height);
    font-size: var(--tap-sys-typography-label-md-size);
    font-weight: var(--tap-sys-typography-label-md-weight);
    color: var(--tap-sys-color-content-primary);
  }
`;

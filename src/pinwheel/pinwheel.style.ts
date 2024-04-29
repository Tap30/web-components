import { css } from "lit";

export default css`
  :host {
    display: inline-flex;
    /* FIXME: we dont have sizing tokens yet  */
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
    padding: var(--tap-sys-spacing-0) var(--tap-sys-spacing-6);
    /* FIXME: we dont have sizing tokens yet  */
    height: 48px;
    font: inherit;
    font-family: var(--tap-sys-font-family);
    line-height: var(--tap-sys-typography-body-md-height);
    font-size: var(--tap-sys-typography-body-md-size);
    font-weight: var(--tap-sys-typography-body-md-weight);
    color: var(--tap-sys-color-content-tertiary);
  }

  .pinwheel div:first-child {
    padding-top: var(--tap-sys-spacing-11);
  }

  .pinwheel div:last-child {
    padding-bottom: var(--tap-sys-spacing-11);
  }

  .active {
    line-height: var(--tap-sys-typography-label-md-height);
    font-size: var(--tap-sys-typography-label-md-size);
    font-weight: var(--tap-sys-typography-label-md-weight);
    color: var(--tap-sys-color-content-primary);
  }
`;

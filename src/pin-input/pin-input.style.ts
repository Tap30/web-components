import {css} from "lit";

export default css`
  :host {
    box-sizing: border-box;
    direction: rtl;
    --justify-content: var(--tap-pin-input-justify-content, start);

    --description-font-family: var(--tap-sys-typography-body-sm-font);
    --description-font-size: var(--tap-sys-typography-body-sm-size);
    --description-line-height: var(--tap-sys-typography-body-sm-height);
    --description-font-weight: var(--tap-sys-typography-body-sm-weight);

    --description-font-family: var(--tap-sys-typography-body-sm-font);
    --description-font-size: var(--tap-sys-typography-body-sm-size);
    --description-line-height: var(--tap-sys-typography-body-sm-height);
    --description-font-weight: var(--tap-sys-typography-body-sm-weight);
    --description-text-color: var(--tap-sys-color-content-tertiary);
    --description-error-text-color: var(--tap-sys-color-content-negative);
    --description-disabled-text-color: var(--tap-sys-color-content-disabled);

    --title-font-family: var(--tap-sys-typography-body-md-font);
    --title-font-size: var(--tap-sys-typography-body-md-size);
    --title-line-height: var(--tap-sys-typography-body-md-height);
    --title-font-weight: var(--tap-sys-typography-body-md-weight);
    --title-text-color: var(--tap-sys-color-content-primary);
    --title-disabled-text-color: var(--tap-sys-color-content-disabled);

    --vertical-gap: .5rem;
    --horizontal-cell-gap: var(--tap-pin-input-cell-gap, 1rem);
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }

  :host([has-error]) .description {
    color: var(--description-error-text-color);
  }

  :host([disabled]) .title, :host([disabled]) .description {
    color: var(--title-disabled-text-color);
  }

  :host([disabled]) .description {
    color: var(--description-disabled-text-color);
  }

  .pin-input {

  }

  .pin-input-wrapper {
    display: flex;
    row-gap: var(--vertical-gap);
    flex-direction: column;
  }


  .title {
    flex: 0 1;
    font-family: var(--title-font-family);
    font-size: var(--title-font-size);
    font-weight: var(--title-font-weight);
    line-height: var(--title-line-height);
    color: var(--title-text-color);
  }

  .description {
    flex: 0 1;
    font-family: var(--description-font-family);
    font-size: var(--description-font-size);
    font-weight: var(--description-font-weight);
    line-height: var(--description-line-height);
    color: var(--description-text-color);
  }

  .input-cells {
    display: flex;
    justify-content: var(--justify-content);
    flex-direction: row-reverse;
    gap: var(--horizontal-cell-gap);
  }
`;

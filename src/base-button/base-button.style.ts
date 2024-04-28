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

  [hidden] {
    display: none !important;
  }

  :host {
    cursor: pointer;
    display: inline-flex;
    user-select: none;
    text-overflow: ellipsis;
    place-content: center;
    place-items: center;
    position: relative;
  }

  .button {
    position: relative;
    cursor: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    vertical-align: middle;
    background: transparent;
    text-decoration: none;
    font: inherit;
    gap: inherit;
    width: 100%;
    font-family: var(--tap-font-family, var(--tap-sys-font-family)), serif;
    border-radius: var(--tap-button-radius, var(--tap-sys-radius-full));
  }

  .cover {
    display: none;
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: var(
      --tap-button-color-surface-cover,
      var(--tap-sys-color-surface-overlay-light)
    );
  }

  .button:active .cover {
    display: inline;
  }

  :host([disabled]) {
    pointer-events: none;
    cursor: default;
  }

  :host([disabled]) .cover {
    display: inline;
    /* FIXME: we need to define a overlay color for disabled since color-mix is not well supported */
    background-color: color-mix(
      in srgb,
      var(
        --tap-button-color-surface-disabled,
        var(--tap-sys-color-surface-disabled)
      ),
      transparent 50%
    );
  }

  :host([size="small"]) .button {
    padding: 0 var(--tap-button-sm-padding, var(--tap-sys-spacing-5));
    height: var(--tap-button-sm-height, var(--tap-sys-spacing-9));
    line-height: var(
      --tap-button-typography-label-sm-height,
      var(--tap-sys-typography-label-sm-height)
    );
    font-size: var(
      --tap-button-typography-label-sm-size,
      var(--tap-sys-typography-label-sm-size)
    );
    font-weight: var(
      --tap-button-typography-label-sm-weight,
      var(--tap-sys-typography-label-sm-weight)
    );
  }

  :host([size="medium"]) .button {
    padding: 0 var(--tap-button-md-padding, var(--tap-sys-spacing-6));
    height: var(--tap-button-md-height, var(--tap-sys-spacing-10));
    line-height: var(
      --tap-button-typography-label-md-height,
      var(--tap-sys-typography-label-sm-height)
    );
    font-size: var(
      --tap-button-typography-label-md-size,
      var(--tap-sys-typography-label-sm-size)
    );
    font-weight: var(
      --tap-button-typography-label-md-weight,
      var(--tap-sys-typography-label-sm-weight)
    );
  }

  :host([size="large"]) .button {
    padding: 0 var(--tap-button-lg-padding, var(--tap-sys-spacing-8));
    /* FIXME: height of the large button is 52px but we dont have 52px in our tokens */
    height: var(--tap-button-lg-height, var(--tap-sys-spacing-11));
    line-height: var(
      --tap-button-typography-label-lg-height,
      var(--tap-sys-typography-label-lg-height)
    );
    font-size: var(
      --tap-button-typography-label-lg-size,
      var(--tap-sys-typography-label-lg-size)
    );
    font-weight: var(
      --tap-button-typography-label-lg-weight,
      var(--tap-sys-typography-label-lg-weight)
    );
  }

  :host([variant="primary"]) .button {
    background-color: var(
      --tap-button-color-surface-inverse-primary,
      var(--tap-sys-color-surface-inverse-primary)
    );
    color: var(
      --tap-button-color-content-on-inverse,
      var(--tap-sys-color-content-on-inverse)
    );
  }

  :host([variant="ghost"]) .button {
    background-color: var(
      --tap-button-color-surface-tertiary,
      var(--tap-sys-color-surface-tertiary)
    );
    color: var(
      --tap-button-color-content-primary,
      var(--tap-sys-color-content-primary)
    );
  }

  :host([variant="naked"]) .button {
    background-color: transparent;
    color: var(
      --tap-button-color-content-primary,
      var(--tap-sys-color-content-primary)
    );
  }

  :host([variant="elevated"]) .button {
    background-color: var(
      --tap-button-color-surface-primary,
      var(--tap-sys-color-surface-primary)
    );
    color: var(
      --tap-button-color-content-primary,
      var(--tap-sys-color-content-primary)
    );
    /* FIXME: we dont have shadow tokens yet  */
    box-shadow: 0 4px 16px 0 #0000001a;
  }

  :host([variant="destructive"]) .button {
    background-color: var(
      --tap-button-color-surface-destructive,
      var(--tap-sys-color-surface-negative-light)
    );
    color: var(
      --tap-button-color-content-destructive,
      var(--tap-sys-color-content-negative)
    );
  }

  :host([variant="brand"]) .button {
    background: var(
      --tap-button-color-gradient-brand,
      var(--tap-sys-color-gradient-brand)
    );
    color: var(
      --tap-button-color-content-on-inverse,
      var(--tap-sys-color-content-on-inverse)
    );
  }
`;

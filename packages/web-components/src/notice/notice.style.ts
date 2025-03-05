import { css } from "lit";

export default css`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  [hidden] {
    display: none !important;
  }

  :host {
    display: inline-block;
    min-width: 328px;

    --notice-border-radius: var(--tapsi-radius-3);
    --notice-padding: var(--tapsi-spacing-6) var(--tapsi-spacing-5);
    --notice-title-font-size: var(--tapsi-typography-label-md-size);
    --notice-title-line-height: var(--tapsi-typography-body-lg-height);
    --notice-title-font-weight: var(--tapsi-typography-label-md-weight);
    --notice-description-font-size: var(--tapsi-typography-body-sm-size);
    --notice-description-line-height: var(--tapsi-typography-body-lg-height);
    --notice-description-font-weight: var(--tapsi-typography-body-sm-weight);
    --notice-align-items: flex-start;
    --notice-icon-color: var(--tapsi-color-content-on-inverse);
    --notice-title-color: var(--tapsi-color-content-on-inverse);
    --notice-background-color: var(--tapsi-color-surface-inverse-primary);
  }

  .root {
    display: inline-flex;
    user-select: none;
    text-overflow: ellipsis;
    position: relative;
    cursor: inherit;
    align-items: var(--notice-align-items);
    justify-content: flex-start;
    vertical-align: middle;

    width: 100%;
    height: auto;
    border-radius: var(--notice-border-radius);
    padding: var(--notice-padding);

    text-decoration: none;
    font-family: var(--tapsi-typography-font-family);

    color: var(--notice-color);
    background-color: var(--notice-background-color);

    --button-custom-overlay-color: var(--tapsi-color-surface-overlay-light);
  }

  .root.standard {
    --notice-border-radius: var(--tapsi-radius-3);
    --notice-padding: var(--tapsi-spacing-6) var(--tapsi-spacing-5);

    --notice-title-font-size: var(--tapsi-typography-label-md-size);
    --notice-title-line-height: var(--tapsi-typography-body-lg-height);
    --notice-title-font-weight: var(--tapsi-typography-label-md-weight);

    --notice-description-font-size: var(--tapsi-typography-body-sm-size);
    --notice-description-line-height: var(--tapsi-typography-body-lg-height);
    --notice-description-font-weight: var(--tapsi-typography-body-sm-weight);

    --notice-align-items: flex-start;
  }

  .root.compact {
    min-height: 36px;
    --notice-border-radius: var(--tapsi-radius-full);
    --notice-padding: var(--tapsi-spacing-2) var(--tapsi-spacing-4);

    --notice-title-font-size: var(--tapsi-typography-body-sm-size);
    --notice-title-line-height: var(--tapsi-typography-body-sm-height);
    --notice-title-font-weight: var(--tapsi-typography-body-sm-weight);

    --notice-description-font-size: var(--tapsi-typography-body-sm-size);
    --notice-description-line-height: var(--tapsi-typography-body-sm-height);
    --notice-description-font-weight: var(--tapsi-typography-body-sm-weight);

    --notice-align-items: center;
  }

  .root.compact.dismissible {
    --notice-padding: var(--tapsi-spacing-2) var(--tapsi-spacing-4)
      var(--tapsi-spacing-2) var(--tapsi-spacing-2);
  }

  .root.icon-artwork.standard {
    --notice-justify-content: flex-start;
  }

  .content {
    margin: 0;
    padding: 0 var(--tapsi-spacing-5);
    overflow: hidden;
    flex-grow: 1;
  }

  .artwork {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: var(--notice-justify-content, center);

    height: 100%;

    color: var(--notice-icon-color);
  }

  .title {
    display: block;

    font-size: var(--notice-title-font-size);
    line-height: var(--notice-title-line-height);
    font-weight: var(--notice-title-font-weight);

    color: var(--notice-title-color);

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    margin: 0;
    padding: 0;
  }

  .description {
    display: block;

    font-size: var(--notice-description-font-size);
    line-height: var(--notice-description-line-height);
    font-weight: var(--notice-description-font-weight);

    color: var(--notice-description-color, var(--notice-title-color));

    margin: 0;
    padding: 0;
  }

  .dismiss svg {
    color: var(--notice-title-color);
  }

  .actions {
    padding-top: var(--tapsi-spacing-5);
    display: flex;
    gap: var(--tapsi-spacing-5);
  }

  .root.inverse.high {
    --notice-icon-color: var(--tapsi-color-content-on-inverse);
    --notice-title-color: var(--tapsi-color-content-on-inverse);
    --notice-background-color: var(--tapsi-color-surface-inverse-primary);
  }
  .root.inverse.low {
    --notice-icon-color: var(--tapsi-color-content-primary);
    --notice-title-color: var(--tapsi-color-content-primary);
    --notice-background-color: var(--tapsi-color-surface-primary);
  }

  .root.success.high {
    --notice-icon-color: var(--tapsi-color-content-on-inverse);
    --notice-title-color: var(--tapsi-color-content-on-inverse);
    --notice-background-color: var(--tapsi-color-surface-positive);
  }
  .root.success.low {
    --notice-icon-color: var(--tapsi-color-content-positive);
    --notice-title-color: var(--tapsi-color-content-primary);
    --notice-background-color: var(--tapsi-color-surface-positive-light);
    --notice-description-color: var(--tapsi-color-content-secondary);
  }

  .root.warning.high {
    --notice-icon-color: var(--tapsi-color-content-primary);
    --notice-title-color: var(--tapsi-color-content-primary);
    --notice-background-color: var(--tapsi-color-surface-warning);
    --notice-description-color: var(--tapsi-color-content-secondary);
  }
  .root.warning.low {
    --notice-icon-color: var(--tapsi-color-content-warning);
    --notice-title-color: var(--tapsi-color-content-primary);
    --notice-background-color: var(--tapsi-color-surface-warning-light);
    --notice-description-color: var(--tapsi-color-content-secondary);
  }

  .root.error.high {
    --notice-icon-color: var(--tapsi-color-content-on-inverse);
    --notice-title-color: var(--tapsi-color-content-on-inverse);
    --notice-background-color: var(--tapsi-color-surface-negative);
  }
  .root.error.low {
    --notice-icon-color: var(--tapsi-color-content-negative);
    --notice-title-color: var(--tapsi-color-content-primary);
    --notice-background-color: var(--tapsi-color-surface-negative-light);
    --notice-description-color: var(--tapsi-color-content-secondary);
  }

  .root.info.high {
    --notice-icon-color: var(--tapsi-color-content-on-inverse);
    --notice-title-color: var(--tapsi-color-content-on-inverse);
    --notice-background-color: var(--tapsi-color-surface-accent);
  }
  .root.info.low {
    --notice-icon-color: var(--tapsi-color-content-accent);
    --notice-title-color: var(--tapsi-color-content-primary);
    --notice-background-color: var(--tapsi-color-surface-accent-light);
    --notice-description-color: var(--tapsi-color-content-secondary);
  }

  .root.success.high .actions {
    --button-custom-background: var(--tapsi-palette-green-500);
    --button-custom-color: var(--notice-title-color);
    --button-disabled-background: var(--tapsi-color-surface-disabled);
    --button-disabled-color: var(--tapsi-color-content-disabled);
  }
  .root.success.low .actions {
    --button-custom-background: var(--tapsi-palette-green-100);
    --button-custom-color: var(--notice-title-color);
  }

  .root.warning.high .actions {
    --button-custom-background: var(--tapsi-palette-yellow-200);
    --button-custom-color: var(--notice-title-color);
  }
  .root.warning.low .actions {
    --button-custom-background: var(--tapsi-palette-yellow-200);
    --button-custom-color: var(--notice-title-color);
  }

  .root.error.high .actions {
    --button-custom-background: var(--tapsi-palette-red-500);
    --button-custom-color: var(--notice-title-color);
  }
  .root.error.low .actions {
    --button-custom-background: var(--tapsi-palette-red-100);
    --button-custom-color: var(--notice-title-color);
  }

  .root.info.high .actions {
    --button-custom-background: var(--tapsi-palette-blue-500);
    --button-custom-color: var(--notice-title-color);
  }
  .root.info.low .actions {
    --button-custom-background: var(--tapsi-palette-blue-100);
    --button-custom-color: var(--notice-title-color);
  }
`;

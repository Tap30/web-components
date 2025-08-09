import { css, type CSSResult } from "lit";

const styles: CSSResult = css`
  :host {
    --discount-card-outer-radius: var(--tapsi-radius-4);
    --discount-card-inner-radius: var(--tapsi-radius-3);
    --discount-card-outer-padding: 0 var(--tapsi-spacing-3)
      var(--tapsi-spacing-3);
    --discount-card-header-padding: var(--tapsi-spacing-4);
    --discount-card-header-title-padding: var(--tapsi-spacing-1)
      var(--tapsi-spacing-0);
    --discount-card-badge-bg-color: transparent;
    --discount-card-badge-color: transparent;
    --discount-card-wrapper-border-color: var(--tapsi-color-border-primary);

    /* Variant color mappings */
    --discount-card-clay-bg: linear-gradient(
      90deg,
      var(--tapsi-palette-blue-100) 0%,
      var(--tapsi-palette-red-100) 100%
    );
    --discount-card-clay-color: var(--tapsi-color-content-primary);
    --discount-card-clay-badge-bg: var(--tapsi-palette-red-100);
    --discount-card-clay-badge-color: var(--tapsi-color-content-primary);
    --discount-card-whisper-bg: linear-gradient(
      90deg,
      #c6c0f9 0%,
      var(--tapsi-palette-blue-100) 100%
    );
    --discount-card-whisper-color: var(--tapsi-color-content-primary);
    --discount-card-whisper-badge-bg: var(--tapsi-palette-blue-100);
    --discount-card-whisper-badge-color: var(--tapsi-color-content-primary);
    --discount-card-azure-bg: linear-gradient(
      90deg,
      rgba(198, 192, 249, 0.4) 0%,
      var(--tapsi-palette-red-50) 100%
    );
    --discount-card-azure-color: var(--tapsi-color-content-primary);
    --discount-card-azure-badge-bg: var(--tapsi-palette-red-50);
    --discount-card-azure-badge-color: var(--tapsi-color-content-primary);
    --discount-card-flame-bg: linear-gradient(
      90deg,
      rgba(255, 213, 194, 0.7) 0%,
      var(--tapsi-palette-yellow-100) 100%
    );
    --discount-card-flame-color: var(--tapsi-color-content-primary);
    --discount-card-flame-badge-bg: var(--tapsi-palette-yellow-100);
    --discount-card-flame-badge-color: var(--tapsi-color-content-primary);
    --discount-card-grayscale-bg: var(--tapsi-color-surface-inverse-secondary);
    --discount-card-grayscale-color: var(--tapsi-palette-white);
    --discount-card-grayscale-badge-bg: var(
      --tapsi-color-surface-inverse-primary
    );
    --discount-card-grayscale-badge-color: var(--tapsi-palette-white);
    --discount-card-none-color: var(--tapsi-color-content-accent);
    --discount-card-none-bg: transparent;
    --discount-card-none-badge-bg: var(--tapsi-palette-blue-50);
    --discount-card-none-badge-color: var(--tapsi-color-content-accent);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  [hidden] {
    display: none !important;
  }

  .root {
    --discount-card-wrapper-border: none;
    --discount-card-root-color: transparent;
    --discount-card-root-bg-color: transparent;
    --discount-card-root-padding: var(--discount-card-outer-padding);
    border-radius: var(--discount-card-outer-radius);
    color: var(--discount-card-root-color);
    background: var(--discount-card-root-bg-color);
    padding: var(--discount-card-root-padding);
  }

  .root.variant-none {
    --discount-card-badge-bg-color: var(--discount-card-none-badge-bg);
    --discount-card-badge-color: var(--tapsi-color-content-accent);
    --discount-card-root-bg-color: var(--discount-card-none-bg);
    --discount-card-root-padding: var(--tapsi-spacing-0);
    --discount-card-wrapper-border: var(--tapsi-stroke-1) solid
      var(--discount-card-wrapper-border-color);
  }

  .root.variant-clay {
    --discount-card-badge-bg-color: var(--discount-card-clay-badge-bg);
    --discount-card-badge-color: var(--discount-card-clay-badge-color);
    --discount-card-root-color: var(--discount-card-clay-color);
    --discount-card-root-bg-color: var(--discount-card-clay-bg);
  }

  .root.variant-whisper {
    --discount-card-badge-bg-color: var(--discount-card-whisper-badge-bg);
    --discount-card-badge-color: var(--tapsi-palette-black);
    --discount-card-root-color: var(--discount-card-whisper-color);
    --discount-card-root-bg-color: var(--discount-card-whisper-bg);
  }

  .root.variant-azure {
    --discount-card-badge-bg-color: var(--discount-card-azure-badge-bg);
    --discount-card-badge-color: var(--tapsi-palette-black);
    --discount-card-root-color: var(--discount-card-azure-color);
    --discount-card-root-bg-color: var(--discount-card-azure-bg);
  }

  .root.variant-flame {
    --discount-card-badge-bg-color: var(--discount-card-flame-badge-bg);
    --discount-card-badge-color: var(--discount-card-flame-badge-color);
    --discount-card-root-color: var(--discount-card-flame-color);
    --discount-card-root-bg-color: var(--discount-card-flame-bg);
  }

  .root.variant-grayscale {
    --discount-card-badge-bg-color: var(--discount-card-grayscale-badge-bg);
    --discount-card-badge-color: var(--discount-card-grayscale-badge-color);
    --discount-card-root-color: var(--discount-card-grayscale-color);
    --discount-card-root-bg-color: var(--discount-card-grayscale-bg);
  }

  .header {
    padding: var(--discount-card-header-padding);
    color: var(--discount-card-root-color);
    display: flex;
  }

  .header-title {
    padding: var(--discount-card-header-title-padding);
    flex: 1 0 auto;
    font-size: var(--tapsi-typography-label-sm-size);
    font-weight: var(--tapsi-typography-label-sm-weight);
    line-height: var(--tapsi-typography-label-sm-height);
  }

  .header-icon {
    height: 1.5rem;
    width: 1.5rem;
    flex: 0 0 1.5rem;
  }

  .wrapper {
    border-radius: var(--discount-card-inner-radius);
    background-color: var(--tapsi-palette-white);
    display: flex;
    border: var(--discount-card-wrapper-border);
  }

  .side {
    padding: var(--tapsi-spacing-6) var(--tapsi-spacing-3);
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 0 0 5.125rem;
  }
  .badge-wrapper {
    position: relative;
    margin: 0 calc(var(--tapsi-spacing-3) * -1) 0 0;

    display: flex;
  }

  .badge-box {
    margin-right: calc(var(--tapsi-stroke-1) * -1);
    background-color: var(--discount-card-badge-bg-color);
    border-radius: var(--tapsi-spacing-3) 0 0 var(--tapsi-spacing-3);
    padding: var(--tapsi-spacing-2) var(--tapsi-spacing-4)
      var(--tapsi-spacing-2) var(--tapsi-spacing-5);
    color: var(--discount-card-badge-color);
    font-weight: var(--tapsi-typography-label-xxs-weight);
    font-size: var(--tapsi-typography-label-xxs-size);
    line-height: var(--tapsi-typography-label-xxs-height);
  }

  .badge-shape {
    position: absolute;
    left: 100%;
    top: 0;
    color: var(--discount-card-badge-bg-color);
  }

  .thumbnail-box {
    margin: var(--tapsi-spacing-9) auto 0;
    color: var(--tapsi-color-content-primary);
    width: 3.75rem;
    height: 3.75rem;
  }

  .dashed-line {
    position: absolute;
    top: 0;
    height: 100%;
    left: calc(var(--tapsi-stroke-1) * -1);
    width: var(--tapsi-stroke-2);
    overflow: hidden;
  }

  .dashed-line::after {
    content: "";
    --border: var(--tapsi-stroke-2);
    --size: 0.875rem;
    --color1: var(--tapsi-color-border-primary);
    --color2: transparent;
    top: 0;
    height: 100%;
    left: -0.1875rem;
    padding: var(--border);
    position: absolute;
    background: repeating-conic-gradient(
        var(--color1) 0 25%,
        var(--color2) 0 50%
      )
      0 0 / var(--size) var(--size) round;
  }

  .body {
    padding: var(--tapsi-spacing-6);
    flex: 1 0 auto;
  }

  .title {
    font-weight: var(--tapsi-typography-label-sm-weight);
    font-size: var(--tapsi-typography-label-sm-size);
    line-height: var(--tapsi-typography-label-sm-height);
    color: var(--tapsi-palette-black);
  }

  .description {
    font-weight: var(--tapsi-typography-label-xs-weight);
    font-size: var(--tapsi-typography-label-xs-size);
    line-height: var(--tapsi-typography-label-xs-height);
    color: var(--tapsi-color-content-tertiary);
    margin-top: var(--tapsi-spacing-2);
  }

  .expiry-date-label {
    --discount-card-expiring-date-label-color: var(
      --tapsi-color-content-tertiary
    );
    font-weight: var(--tapsi-typography-label-xs-weight);
    font-size: var(--tapsi-typography-label-xs-size);
    line-height: var(--tapsi-typography-label-xs-height);
    color: var(--discount-card-expiring-date-label-color);
  }

  .expiry-date-label.expiring {
    --discount-card-expiring-date-label-color: var(
      --tapsi-color-content-negative
    );
  }

  .action {
    margin-top: var(--tapsi-spacing-4);
  }
`;

export default styles;

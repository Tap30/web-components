import { css, type CSSResult } from "lit";

const styles: CSSResult = css`
  .control {
    height: auto;
    padding: var(--tapsi-spacing-5) var(--tapsi-spacing-6);

    align-items: flex-start;
  }

  .input,
  .shadow {
    resize: none;
    padding: 0;
    border: none;
    /* For Internet Explorer and older Edge */
    -ms-overflow-style: none;
    /* For Firefox and newer browsers */
    scrollbar-width: none;
  }

  .input::-webkit-scrollbar,
  .shadow::-webkit-scrollbar {
    /* Also works for WebKit */
    display: none;
  }

  .shadow {
    pointer-events: none;
    /* Remove from the content flow */
    position: absolute;
    visibility: hidden;
    /* Ignore the scrollbar width */
    overflow: hidden;
    top: 0;
    height: 0;
    /* Create a new layer, increase the isolation of the computed values */
    isolation: isolate;
  }
`;

export default styles;

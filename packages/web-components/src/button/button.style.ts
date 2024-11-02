import { css } from "lit";

export default css`
  :host([size="small"]) .button {
    height: var(--tap-button-sm-height, var(--tap-sys-spacing-9));
    padding: 0 var(--tap-button-sm-padding, var(--tap-sys-spacing-5));
  }

  :host([size="medium"]) .button {
    height: var(--tap-button-md-height, var(--tap-sys-spacing-10));
    padding: 0 var(--tap-button-md-padding, var(--tap-sys-spacing-6));
  }

  :host([size="large"]) .button {
    /* FIXME: height of the large button is 52px but we dont have 52px in our tokens */
    height: var(--tap-button-lg-height, var(--tap-sys-spacing-11));
    padding: 0 var(--tap-button-lg-padding, var(--tap-sys-spacing-8));
  }
`;

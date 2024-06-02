import { css } from 'lit';

export default css`
  :host {
    border-radius: var(--tap-sys-radius-full);
  }

  :host([size='small']) .button {
    padding: var(--tap-button-sm-padding, var(--tap-sys-spacing-5));
    height: var(--tap-button-sm-height, var(--tap-sys-spacing-9));
    width: var(--tap-button-sm-height, var(--tap-sys-spacing-9));
  }

  :host([size='medium']) .button {
    padding: var(--tap-button-md-padding, var(--tap-sys-spacing-6));
    height: var(--tap-button-md-height, var(--tap-sys-spacing-10));
    width: var(--tap-button-md-height, var(--tap-sys-spacing-10));
  }

  :host([size='large']) .button {
    padding: var(--tap-button-lg-padding, var(--tap-sys-spacing-8));
    /* FIXME: height of the large button is 52px but we dont have 52px in our tokens */
    height: var(--tap-button-lg-height, var(--tap-sys-spacing-11));
    width: var(--tap-button-lg-height, var(--tap-sys-spacing-11));
  }
`;

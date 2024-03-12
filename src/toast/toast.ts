import {html, LitElement, nothing} from "lit";
import {property} from "lit/decorators.js";
import {TOAST_COLORS} from "./types";

// TODO: after implementing the icon library, add the `icon` property to this component.
// TODO: add close icon.
export class Toast extends LitElement {
  static readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  private readonly internals!: ElementInternals;

  private renderSuccessIcon() {
    return html`
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 2C18.02 2 22.5 6.48 22.5 12C22.5 17.52 18.02 22 12.5 22C6.98 22 2.5 17.52 2.5 12C2.5 6.48 6.98 2 12.5 2ZM16.7929 8.29297L11.5 13.5859L9.20712 11.293L7.79291 12.7072L11.5 16.4143L18.2071 9.70718L16.7929 8.29297Z" fill="white"/>
      </svg>
    `
  }
  private renderErrorIcon() {
    return html`
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 22C18.02 22 22.5 17.52 22.5 12C22.5 6.48 18.02 2 12.5 2C6.98 2 2.5 6.48 2.5 12C2.5 17.52 6.98 22 12.5 22ZM11.5 7H13.5V13H11.5V7ZM11.5 15H13.5V17H11.5V15Z" fill="white"/>
      </svg>
    `
  }
  private renderInfoIcon() {
    return html`
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 2C18.02 2 22.5 6.48 22.5 12C22.5 17.52 18.02 22 12.5 22C6.98 22 2.5 17.52 2.5 12C2.5 6.48 6.98 2 12.5 2ZM11.5 17H13.5V11H11.5V17ZM11.5 9H13.5V7H11.5V9Z" fill="white"/>
      </svg>
    `
  }
  private renderWarningIcon() {
    return html`
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7603 5.09648L14.8686 5.24257L21.9919 15.5147C22.3229 15.9919 22.5 16.5572 22.5 17.1362C22.5 18.6613 21.2964 19.908 19.7788 19.9951L19.6089 20H5.39137C4.8088 20 4.23981 19.8257 3.75898 19.4998C2.49183 18.6411 2.13108 16.9604 2.90668 15.6718L3.00522 15.5192L10.0994 5.2471C10.2604 5.01391 10.4552 4.80593 10.6771 4.62968L10.8486 4.50355L11.0025 4.40565C12.2498 3.66573 13.8641 3.96249 14.7603 5.09648ZM13.4662 14.8628H11.4724V16.8378H13.4662V14.8628ZM13.4662 8.44386H11.4724V12.8877H13.4662V8.44386Z" fill="black"/>
      </svg>
    `
  }
  private renderDefaultIcon() {
    return html`
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 12C4.5 16.4183 8.08172 20 12.5 20C16.9183 20 20.5 16.4183 20.5 12C20.5 7.58172 16.9183 4 12.5 4C8.08172 4 4.5 7.58172 4.5 12ZM12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 12C9.5 13.6569 10.8431 15 12.5 15C14.1569 15 15.5 13.6569 15.5 12C15.5 10.3431 14.1569 9 12.5 9C10.8431 9 9.5 10.3431 9.5 12ZM12.5 7C9.73858 7 7.5 9.23858 7.5 12C7.5 14.7614 9.73858 17 12.5 17C15.2614 17 17.5 14.7614 17.5 12C17.5 9.23858 15.2614 7 12.5 7Z" fill="white"/>
      </svg>
    `
  }

  private renderIcon() {
    if (this.color === TOAST_COLORS.SUCCESS) return this.renderSuccessIcon();
    if (this.color === TOAST_COLORS.ERROR) return this.renderErrorIcon();
    if (this.color === TOAST_COLORS.INFO) return this.renderInfoIcon();
    if (this.color === TOAST_COLORS.WARNING) return this.renderWarningIcon();
    return this.renderDefaultIcon();
  }

  @property() message?: string;
  @property({ type: Boolean, reflect: true }) showDismissButton? = false;
  @property({ type: Number, reflect: true }) autoHideDuration? = -1;
  @property({ reflect: true }) color?: TOAST_COLORS = TOAST_COLORS.INVERSE;
  @property({ reflect: true }) onOpen?: () => void;
  @property({ reflect: true }) onClose?: () => void;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  handleClose() {
    this.onClose?.();
    this.disconnectedCallback();
    this.remove();
  }

  connectedCallback() {
    super.connectedCallback();
    this.onOpen?.();
    if (this.autoHideDuration && this.autoHideDuration >= 0)
      setTimeout(() => this.handleClose(), this.autoHideDuration);
  }

  render() {
    return html`
          <div
            dir="rtl"
            id="toast"
            class="toast"
            role="alertdialog"
            aria-label=${nothing}
            aria-labelledby=${nothing}
            aria-describedby=${nothing}
          >
            <span class="toast-icon" id="toast-icon">
              ${this.renderIcon()}
            </span>
            <span id="toast-message">${this.message}</span>
            <button
              class="toast-dismiss"
              id="toast-dismiss"
              @click=${this.handleClose}
            >
              X
            </button>
          </div>
        `;
  }
}

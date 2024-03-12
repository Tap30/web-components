import { LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import {
  defaultIcon,
  circleInformationFill,
  circleExclamationFill,
  triangleExclamationFill,
  circleCheckFill,
} from "./icon";
import { ToastColors } from "./types";

const getIcon = (color: ToastColors | undefined) => {
  if (color === "success") return circleCheckFill;
  if (color === "error") return circleExclamationFill;
  if (color === "info") return circleInformationFill;
  if (color === "warning") return triangleExclamationFill;
  return defaultIcon;
};

// TODO: after implementing the icon library, add the `icon` property to this component.
export class Toast extends LitElement {
  static readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  private readonly internals!: ElementInternals;

  @property() message?: string;
  @property({ type: Boolean, reflect: true }) showDismissButton? = false;
  @property({ type: Number, reflect: true }) autoHideDuration? = -1;
  @property({ reflect: true }) color?: ToastColors = "inverse";
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
              <img src=${getIcon(this.color)} alt="toast icon" />
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

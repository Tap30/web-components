import "../icon-button";

import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { Parts, Slots } from "./constants";
import { OpenChangeEvent } from "./events";
import { dismiss } from "./icons";

export class BottomSheet extends LitElement {
  public static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: Boolean })
  public open = false;

  @property({ type: Boolean })
  public expanded = false;

  @property({ type: String, reflect: true, attribute: "dismiss-strategy" })
  public dismissStrategy: "grabber" | "button" = "button";

  @property({ type: String, reflect: true, attribute: "overlay-visibility" })
  public overlayVisibility: "on-expansion" | "visible" | "hidden" =
    "on-expansion";

  private _handleDismissButtonClick() {
    const newOpenState = !this.open;
    const openChangeEvent = new OpenChangeEvent(newOpenState);

    this.open = newOpenState;
    this.dispatchEvent(openChangeEvent);
  }

  private _renderDismissButton() {
    return html`
      <tap-icon-button
        class="dismiss"
        part=${Parts.DISMISS}
        size="small"
        variant="ghost"
        @click=${this._handleDismissButtonClick}
      >
        ${dismiss}
      </tap-icon-button>
    `;
  }

  private _renderGrabber() {
    return html`
      <div
        class="grabber"
        part=${Parts.GRABBER}
      ></div>
    `;
  }

  private _renderOverlay() {
    if (this.overlayVisibility === "hidden") return nothing;

    return html`
      <div
        part=${Parts.OVERLAY}
        class="overlay"
      ></div>
    `;
  }

  private _renderDismissAction() {
    if (this.dismissStrategy === "grabber") return this._renderGrabber();

    return this._renderDismissButton();
  }

  protected override render() {
    return html`
      <div
        part=${Parts.ROOT}
        class="root"
      >
        ${this._renderOverlay()}
        <div
          part=${Parts.HEADER}
          class="header"
        >
          ${this._renderDismissAction()}
          <slot name=${Slots.HEADER}></slot>
        </div>
        <div
          part=${Parts.BODY}
          class="body"
        >
          <slot name=${Slots.BODY}></slot>
        </div>
        <div
          part=${Parts.ACTION_BAR}
          class="action-bar"
        >
          <slot name=${Slots.ACTION_BAR}></slot>
        </div>
      </div>
    `;
  }
}

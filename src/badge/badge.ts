import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import {BadgePriority, BadgeType, BadgeValue, BadgeVariant} from "./types";

export class Badge extends LitElement {
  @property({ reflect: true }) value?: BadgeValue = "";
  @property({ reflect: true }) type: BadgeType = "pill";
  @property({ reflect: true }) variant: BadgeVariant = "inverse";
  @property({ reflect: true }) priority: BadgePriority = "high";
  @property({ reflect: true }) leadingIcon?: boolean = false;

  private renderIcon() {
    return html`
      <svg class="icon" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C7.76 0 10 2.24 10 5C10 7.76 7.76 10 5 10C2.24 10 0 7.76 0 5C0 2.24 2.24 0 5 0ZM4.5 7.5H5.5V4.5H4.5V7.5ZM4.5 3.5H5.5V2.5H4.5V3.5Z" fill="white"/>
      </svg>
    `;
  }

  private renderDotBadge() {
    return html`
      <span class="badge" />
    `
  }

  private renderNormalBadge() {
    return html`
      <span class="badge">
        ${ this.leadingIcon ? this.renderIcon() : null}
        ${ this.value}
      </span>
    `
  }

  render() {
    return html`
      <span class="wrapper">
        ${ this.type === "dot" ? this.renderDotBadge() : this.renderNormalBadge()}
        <slot></slot>
      </span>
    `;
  }
}

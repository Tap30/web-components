import { LitElement, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { logger } from "../utils/index.ts";
import { ActiveChangeEvent } from "./events.ts";
import { ActivateEvent, type BottomNavigationItem } from "./item/index.ts";

export class BottomNavigation extends LitElement {
  /**
   * Defines a string value that can be used to set a label
   * for assistive technologies.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  @property({ type: String })
  public label = "";

  constructor() {
    super();

    this._handleItemActivation = this._handleItemActivation.bind(this);
  }

  public override connectedCallback() {
    super.connectedCallback();

    this.addEventListener(
      ActivateEvent.type,
      this._handleItemActivation as EventListener,
    );
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener(
      ActivateEvent.type,
      this._handleItemActivation as EventListener,
    );
  }

  private _handleItemActivation(event: ActivateEvent) {
    const item = event.target as BottomNavigationItem;
    const value = item.value;

    this.dispatchEvent(new ActiveChangeEvent({ value }));
  }

  protected override render() {
    if (!this.label) {
      logger(
        "Set `label` attribute for better accessibility.",
        "bottom-navigation",
        "warning",
      );
    }

    return html`
      <nav
        role="navigation"
        class="root"
        part="root"
        aria-label=${this.label || nothing}
      >
        <slot></slot>
      </nav>
    `;
  }
}

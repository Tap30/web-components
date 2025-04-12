import { LitElement, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { logger } from "../utils/index.ts";
import styles from "./bottom-navigation.style.ts";
import { ActiveChangeEvent } from "./events.ts";
import { ActivateEvent } from "./item/events.ts";
import { type BottomNavigationItem } from "./item/item.ts";

/**
 * @summary The bottom navigation component offers global, persistent navigation throughout an app.
 *
 * @tag tapsi-bottom-navigation
 *
 * @slot - The default slot for navigation items.
 *
 * @fires {ActiveChangeEvent} activechange - Fired when the items activation state changes (bubbles).
 */
export class BottomNavigation extends LitElement {
  /** @internal */
  public static override readonly styles = [styles];

  /**
   * Defines a string value that can be used to set a label
   * for assistive technologies.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   *
   * @prop {string} label
   * @attr {string} label
   * @default ""
   */
  @property()
  public label = "";

  constructor() {
    super();

    this._handleItemActivation = this._handleItemActivation.bind(this);
  }

  /** @internal */
  public override connectedCallback() {
    super.connectedCallback();

    this.addEventListener(
      ActivateEvent.type,
      this._handleItemActivation as EventListener,
    );
  }

  /** @internal */
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

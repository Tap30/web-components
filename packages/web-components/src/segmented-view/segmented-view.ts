import { html, LitElement, nothing } from "lit";
import { property } from "lit/decorators.js";
import { logger } from "../utils/index.ts";
import { ActiveChangeEvent } from "./events.ts";
import { ActivateEvent } from "./item/events.ts";
import { type SegmentedViewItem } from "./item/item.ts";
import styles from "./segmented-view.style.ts";

/**
 * @summary The segmented view component that makes exploring and switching between different views easy.
 *
 * @tag tapsi-segmented-view
 *
 * @slot - The default slot for segmented view items.
 *
 * @fires {ActiveChangeEvent} activechange - Fired when the items activation state changes. (bubbles)
 */
export class SegmentedView extends LitElement {
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

    this._handleItemActivate = this._handleItemActivate.bind(this);
  }

  /** @internal */
  public override connectedCallback() {
    super.connectedCallback();

    this.addEventListener(
      ActivateEvent.type,
      this._handleItemActivate as EventListener,
    );
  }

  /** @internal */
  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    this.removeEventListener(
      ActivateEvent.type,
      this._handleItemActivate as EventListener,
    );
  }

  private _handleItemActivate(event: ActivateEvent) {
    const item = event.target as SegmentedViewItem;
    const value = item.value;

    this.dispatchEvent(new ActiveChangeEvent({ value }));
  }

  protected override render() {
    if (!this.label) {
      logger(
        "Set `label` attribute for better accessibility.",
        "segmented-view",
        "warning",
      );
    }

    return html`
      <div
        role="tablist"
        class="root"
        part="root"
        aria-label=${this.label || nothing}
      >
        <slot></slot>
      </div>
    `;
  }
}

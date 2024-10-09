import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map";
import { debounce } from "../utils";

export class Pinwheel extends LitElement {
  @state()
  private _selectedIndex = 0;

  @property({ type: Array, attribute: false })
  public items: Array<string> = [];

  private _itemHeight = 48;

  public override connectedCallback() {
    super.connectedCallback();
    this.addEventListener("scroll", event =>
      this._handleScroll(event.target as HTMLElement),
    );
  }

  public override disconnectedCallback() {
    this.removeEventListener("scroll", event =>
      this._handleScroll(event.target as HTMLElement),
    );
    super.disconnectedCallback();
  }

  private _dispatchChangeEvent = () => {
    this.dispatchEvent(
      new CustomEvent("pinwheel-change", {
        detail: {
          selectedIndex: this._selectedIndex,
        },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private _handleScroll = debounce((target: HTMLElement) => {
    this._selectedIndex = Math.round(target?.scrollTop / this._itemHeight);
    const isActiveElementInCenter = target?.scrollTop % this._itemHeight === 0;

    if (!isActiveElementInCenter) {
      this._scrollToActiveItem();
    } else {
      this._dispatchChangeEvent();
    }
  }, 100);

  private _handleClickItem = (index: number) => {
    this._selectedIndex = index;
    this._scrollToActiveItem();
  };

  private _scrollToActiveItem = () => {
    const scrollTopPosition = this._selectedIndex * this._itemHeight;

    this.scrollTo({ top: scrollTopPosition, behavior: "smooth" });
  };

  private _renderItems() {
    return this.items.map((item, idx) => {
      return html`<div
        part="pinwheel-item"
        class=${classMap({
          item: true,
          active: this._selectedIndex === idx,
        })}
        @click="${() => this._handleClickItem(idx)}"
        tabindex="0"
      >
        ${item}
      </div>`;
    });
  }

  protected override render() {
    return html`
      <div
        class="pinwheel"
        part="pinwheel"
      >
        ${this._renderItems()}
      </div>
    `;
  }
}

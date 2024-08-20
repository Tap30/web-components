import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { debounce } from '../utils/utils';
import { classMap } from 'lit/directives/class-map.js';

export class Pinwheel extends LitElement {
  @state() private selectedIndex = 0;
  @property({ type: Array, attribute: false }) items: Array<string> = [];

  private itemHeight = 48;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('scroll', (event) =>
      this.handleScroll(event.target as HTMLElement),
    );
  }

  disconnectedCallback() {
    this.removeEventListener('scroll', (event) =>
      this.handleScroll(event.target as HTMLElement),
    );
    super.disconnectedCallback();
  }

  private dispatchChangeEvent = () => {
    this.dispatchEvent(
      new CustomEvent('pinwheel-change', {
        detail: {
          selectedIndex: this.selectedIndex,
        },
        bubbles: true,
        composed: true,
      }),
    );
  };

  private handleScroll = debounce((target: HTMLElement) => {
    this.selectedIndex = Math.round(target?.scrollTop / this.itemHeight);
    const isActiveElementInCenter = target?.scrollTop % this.itemHeight === 0;
    if (!isActiveElementInCenter) {
      this.scrollToActiveItem();
    } else {
      this.dispatchChangeEvent();
    }
  }, 100);

  private handleClickItem = (index: number) => {
    this.selectedIndex = index;
    this.scrollToActiveItem();
  };

  private scrollToActiveItem = () => {
    const scrollTopPosition = this.selectedIndex * this.itemHeight;
    this.scrollTo({ top: scrollTopPosition, behavior: 'smooth' });
  };

  private renderItem = (item: string, index: number) => {
    return html`<div
      part="pinwheel-item"
      class=${classMap({
        item: true,
        active: this.selectedIndex === index,
      })}
      @click="${() => this.handleClickItem(index)}"
      tabindex="0"
    >
      ${item}
    </div>`;
  };

  render() {
    return html`
      <div class="pinwheel" part="pinwheel">
        ${this.items.map(this.renderItem)}
      </div>
    `;
  }
}

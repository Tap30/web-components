import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { debounce } from '../utils/utils';

export class Pinwheel extends LitElement {
  @state() private selectedItemIndex = 0;
  @property({ type: Array , attribute:false}) items: Array<string> = [];

  private itemHeight = 48;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('scroll', this.handleScroll);
  }

  disconnectedCallback() {
    this.removeEventListener('scroll', this.handleScroll)
    super.disconnectedCallback();
  }

  private dispatchChangeEvent = () => {
    this.dispatchEvent(
      new CustomEvent("pinwheel-change", {
        detail: {
          selected: this.selectedItemIndex,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleScroll = debounce((event: Event) => {
    const target = event.target as HTMLElement;
    this.selectedItemIndex = Math.round(target?.scrollTop / this.itemHeight);
    if (target?.scrollTop % this.itemHeight) {
      this.scrollToActiveItem();
    }
    this.dispatchChangeEvent();
  }, 100);

  private handleClickItem = (index: number) => {
    this.selectedItemIndex = index;
    this.scrollToActiveItem();
    this.dispatchChangeEvent();
  }

  private scrollToActiveItem = () => {
    const scrollTopPosition = this.selectedItemIndex * this.itemHeight;
    this.scrollTo({ top: scrollTopPosition, behavior: 'smooth' })
  }

  private renderItem = (item: string, index: number) => {
    return html`<div
      class=${this.selectedItemIndex === index ? 'active': null}
      @click='${() => {this.handleClickItem(index)}}'
    >
      ${item}
    </div>`
  }

  render() {
    return html`
      <div class="pinwheel" part="pinwheel">
        ${this.items.map(this.renderItem)}
      </div>
    `
  }
}

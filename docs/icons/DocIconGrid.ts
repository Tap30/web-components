import { html, LitElement, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import "vitepress/theme";
import metadata from "../../dist/components-metadata.json";
import { type Icon } from "../../internals/doc-helpers/types";

@customElement("doc-icon-grid")
export class DocIconGrid extends LitElement {
  protected override createRenderRoot() {
    return this;
  }

  @state()
  _searchString: string = "";

  @state()
  _showModal: boolean = false;

  @state()
  _selectedIcon: null | Icon = null;

  private _handleInputChange(e: Event) {
    this._searchString = (e.target as HTMLInputElement).value;
  }

  private _normalizeStringFiltering(inputString: string): string {
    return inputString.toLowerCase().replace(/-/g, "").replace(/_/g, "");
  }

  private _renderModal() {
    if (this._selectedIcon) {
      return html`<div
        role="button"
        aria-expanded="true"
        aria-haspopup="listbox"
        aria-labelledby="docsearch-label"
        tabindex="0"
        class="DocSearch DocSearch-Container"
        aria-controls="docsearch-hits0-list"
        @click=${() => {
          this._showModal = false;
          this._selectedIcon = null;
        }}
      >
        <div class="DocSearch-Modal">
          <h2>${this._selectedIcon?.pascalName} Icon</h2>

          <h3>Preview</h3>

          <div class="tapsi-icon-wrapper">
            ${this._selectedIcon.svgTag
              ? html`<Fragment>${this._selectedIcon.svgTag}</Fragment>`
              : nothing}
          </div>

          <h3>Properties</h3>
        </div>
      </div>`;
    }

    return nothing;
  }

  private _renderHeader() {
    return html`<header id="icon-header">
      <h1>Icons</h1>
      <div class="icons-search-input">
        <label
          for="icon-search"
          id="docsearch-label"
          class="DocSearch-MagnifierLabel"
          ><svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            class="s"
          >
            <path
              d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
              stroke="currentColor"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path></svg
          ><span class="DocSearch-VisuallyHiddenForAccessibility"
            >Search</span
          ></label
        >
        <input
          @input=${this._handleInputChange}
          id="icon-search"
          autofocus="true"
          placeholder="Search icons"
          type="search"
          class="DocSearch-Input"
        />
      </div>
    </header>`;
  }

  private _renderIcons() {
    const filteredIcons = metadata.icons.filter(icon =>
      this._normalizeStringFiltering(icon.kebabName).includes(
        this._normalizeStringFiltering(this._searchString),
      ),
    );

    if (filteredIcons.length > 0) {
      return filteredIcons.map(icon => {
        const button = document.createElement("button");

        button.className = "icon-item";
        button.title = icon.kebabName;
        button.innerHTML = icon.svgTag;
        button.addEventListener("click", () => {
          this._showModal = true;
          this._selectedIcon = icon;
        });
        return button;

        return html`<a href=${icon.kebabName}>${button}</a>`;
      });
    }

    return html`<div>No Icon was found for "${this._searchString}"!</div>`;
  }

  protected override render(): unknown {
    return html`
      ${this._showModal ? this._renderModal() : nothing} ${this._renderHeader()}
      <div id="icons-grid">${this._renderIcons()}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "doc-icon-grid": DocIconGrid;
  }
}

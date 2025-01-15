import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "vitepress/theme";
import metadata from "../../../dist/components-metadata.json";

@customElement("doc-icon-grid")
export class DocIconGrid extends LitElement {
  protected override createRenderRoot() {
    return this;
  }

  @state()
  _searchString: string = "";

  private _handleInputChange(e) {
    this._searchString = e.target.value;
  }

  private _normalizeStringFiltering(inputString: string): string {
    return inputString.toLowerCase().replace(/-/g, "").replace(/_/g, "");
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

        return html`<a href=${icon.kebabName}>${button}</a>`;
      });
    }

    return html`<div>No Icon was found for "${this._searchString}"!</div>`;
  }

  protected override render(): unknown {
    return html`
      ${this._renderHeader()}
      <div id="icons-grid">${this._renderIcons()}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "doc-icon-grid": DocIconGrid;
  }
}

import icons from "@tapsioss/icons";
import * as scrollLock from "body-scroll-lock";
import { createFocusTrap, type FocusTrap } from "focus-trap";
import { html, LitElement, nothing, svg, type PropertyValues } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import "vitepress/theme";
import {
  getFormattedImportUsageString,
  getFormattedTagUsageString,
  getUsageSectionMarkdown,
} from "../../utils/markdown.ts";

type SVGPathInfo = {
  clipRule?: string;
  fillRule?: string;
  xlinkHref?: string;
  d: string;
};

type SVGIconInfo = {
  kebabName: string;
  pascalName: string;
  paths: SVGPathInfo[];
};

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
  _selectedIcon: null | SVGIconInfo = null;

  @query("#icon-modal")
  private _iconModal!: HTMLElement;

  private _focusTrapper: null | FocusTrap = null;

  private _handleInputChange(e: Event) {
    this._searchString = (e.target as HTMLInputElement).value;
  }

  private _normalizeStringFiltering(inputString: string): string {
    return inputString.toLowerCase().replace(/-/g, "").replace(/_/g, "");
  }

  public override disconnectedCallback() {
    super.disconnectedCallback();

    scrollLock.enableBodyScroll(this._iconModal);

    this._focusTrapper?.deactivate();
    this._focusTrapper = null;

    window.removeEventListener("keydown", this._handleEscapeKey);
  }

  protected override firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    this._focusTrapper = createFocusTrap(this._iconModal, {
      clickOutsideDeactivates: true,
    });

    window.addEventListener("keydown", this._handleEscapeKey);
  }

  private _handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      this._closeModal();
    }
  };

  private _closeModal = () => {
    this._showModal = false;
    this._selectedIcon = null;
    scrollLock.enableBodyScroll(this._iconModal);
    this._focusTrapper?.deactivate();
  };

  private _openModal = (icon: SVGIconInfo) => {
    this._showModal = true;
    this._selectedIcon = icon;
    scrollLock.disableBodyScroll(this._iconModal);

    void this.updateComplete.then(() => {
      this._focusTrapper?.activate();
    });
  };

  private _getSvg(iconPaths?: SVGPathInfo[]) {
    if (!iconPaths) return;
    return html`
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        ${iconPaths.map(({ d, clipRule, fillRule }) => {
          return svg`<path
              d=${d ?? nothing}
              clip-rule=${clipRule ?? nothing}
              fill-rule=${fillRule ?? nothing}
            />`;
        })}
      </svg>
    `;
  }

  private _renderIconUsageSection() {
    if (!this._selectedIcon) return null;

    return unsafeHTML(
      getUsageSectionMarkdown([
        [
          "Import",
          getFormattedImportUsageString(
            `@tapsioss/web-icons/${this._selectedIcon.kebabName}`,
          ),
        ],
        [
          "Tag",
          getFormattedTagUsageString(
            `tapsi-icon-${this._selectedIcon.kebabName}`,
          ),
        ],
      ]),
    );
  }

  private _renderModal() {
    return html`<div
        aria-hidden="true"
        class=${classMap({
          "modal-overlay": true,
          open: this._showModal,
        })}
        @click=${this._closeModal}
      ></div>

      <div
        id="icon-modal"
        role="dialog"
        aria-labelledby="modal-header"
        aria-modal="true"
        class=${classMap({
          modal: true,
          open: this._showModal,
        })}
        @click=${(e: Event) => e.stopPropagation()}
        ?inert=${!this._showModal}
      >
        <header
          style="display:flex; justify-content:space-between; align-items: center;"
        >
          <h3 id="modal-header">${this._selectedIcon?.pascalName} Icon</h3>
          <button
            @click=${this._closeModal}
            aria-label="close modal"
          >
            <svg
              viewBox="0 0 24 24"
              class="tapsi-icon"
              id="cross-icon"
              aria-hidden="true"
            >
              <path
                d="M17.6565 7.75735L13.4138 12L17.6565 16.2426L16.2423 17.6568L11.9996 13.4142L7.75699 17.6568L6.34277 16.2426L10.5854 12L6.34277 7.75735L7.75699 6.34314L11.9996 10.5858L16.2423 6.34314L17.6565 7.75735Z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
        </header>

        <main>
          <h4>Usage</h4>

          ${this._renderIconUsageSection()}

          <h4>Preview</h4>

          <div
            class="tapsi-icon-wrapper"
            id="icon-wrapper"
          >
            ${this._getSvg(this._selectedIcon?.paths)}
          </div>
        </main>
      </div> `;
  }

  private _renderSearchIcon() {
    return html`<svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
        stroke="currentColor"
        fill="none"
        fill-rule="evenodd"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>`;
  }

  private _renderSearchbar() {
    return html`<div id="icon-header">
      <p>Select an icon to view its details.</p>
      <span class="icons-search-input">
        <label
          for="icon-search"
          id="docsearch-label"
          class="DocSearch-MagnifierLabel"
        >
          ${this._renderSearchIcon()}
          <span class="DocSearch-VisuallyHiddenForAccessibility"
            >Search</span
          ></label
        >
        <input
          @input=${this._handleInputChange}
          id="icon-search"
          placeholder="Search icons"
          type="search"
          class="DocSearch-Input"
        />
      </span>
    </div>`;
  }

  private _shouldShowIconInGrid(icon: SVGIconInfo) {
    // Do not apply the filter if the user typed a single-character string in search input.
    if (this._searchString.length < 2) return true;

    return this._normalizeStringFiltering(icon.kebabName).includes(
      this._normalizeStringFiltering(this._searchString),
    );
  }

  private _renderIcons() {
    const filteredIcons = Object.values(
      icons as Record<string, SVGIconInfo>,
    ).filter(icon => this._shouldShowIconInGrid(icon));

    if (filteredIcons.length > 0) {
      return filteredIcons.map(icon => {
        return html`<button
          title=${icon.kebabName}
          class="icon-item"
          aria-label="open icon modal"
          @click=${() => this._openModal(icon)}
        >
          ${this._getSvg(icon.paths)}
        </button>`;
      });
    }

    return html`<div>No icon was found for "${this._searchString}"!</div>`;
  }

  protected override render() {
    return html`
      ${this._renderModal()}${this._renderSearchbar()}
      <div id="icons-grid">${this._renderIcons()}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "doc-icon-grid": DocIconGrid;
  }
}

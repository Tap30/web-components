import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import "../button";
import "../icon-button";
import "../spinner";
import "@tapsioss/icons/dist/icons/trash";
import { photoIcon, clearIcon } from "./icons";

export class MediaUploader extends LitElement {
  @property({ type: String })
  public accept!: string;

  @property({ type: String, attribute: "placeholder-text" })
  public placeholderText: string = "بارگذاری";

  @property({
    type: Number,
    converter: {
      fromAttribute: value => {
        if (value === null) {
          return false;
        }

        const parsed = Number(value);

        return isNaN(parsed) ? value === "true" : parsed;
      },
      toAttribute: value => value,
    },
  })
  public pending: boolean | number = false;

  @property({ type: String })
  public value: string | null = null; // The image URL or null

  constructor() {
    super();
  }

  private _handleUpload(e: Event) {
    const fileInput = e.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.value = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  private _handleClear() {
    this.value = null; // Clear the image
    console.log("Image cleared");
  }

  renderContents() {
    if (this.value) {
      return html`
        <img
          class="image-preview"
          src="${this.value}"
          alt="Uploaded image"
        />
        <tap-icon-button
          class="clear-button"
          size="small"
          variant="elevated"
          @click=${this._handleClear}
        >
          <tap-icon-trash></tap-icon-trash>
        </tap-icon-button>
      `;
    }

    if (typeof this.pending === "number") {
      return html`
        <b>${this.pending}%</b>
        <p>در حال بارگذاری...</p>
      `;
    }

    if (this.pending) {
      return html`
        <tap-spinner></tap-spinner>
        <p>در حال بارگذاری...</p>
      `;
    }

    // return html`
    //   <div
    //     class="icon"
    //     part="icon"
    //   >
    //     ${failedIcon}
    //   </div>
    //   <tap-button
    //     size="small"
    //     variant="ghost"
    //     @click="${this._handleRetry}"
    //   >
    //     تلاش مجدد
    //   </tap-button>
    // `;
    return html`
      <input
        class="file-input"
        part="file-input"
        type="file"
        accept="${this.accept}"
        @change="${this._handleUpload}"
      />
      <div
        class="icon"
        part="icon"
      >
        ${photoIcon}
      </div>
      ${this.placeholderText}
    `;
  }

  protected override render() {
    return html`
      <div
        class="root"
        part="root"
        role="button"
      >
        ${this.renderContents()}
      </div>
    `;
  }
}

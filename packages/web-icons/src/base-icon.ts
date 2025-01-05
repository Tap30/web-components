type Size = number | `${number}` | "auto";

class BaseIcon extends HTMLElement {
  /**
   * The viewBox of the SVG.
   *
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   *
   * @default "0 0 24 24"
   */
  private _viewBox: string = "0 0 24 24";
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  private _srTitle?: string;
  /**
   * The size of the icon.
   * If set to `"auto"`, the icon will get the parent's width and height.
   *
   * @default "auto"
   */
  private _size: Size = "auto";

  protected paths?: string;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  public declare viewbox: string;
  public declare title: string;
  public declare size: Size;

  public static get observedAttributes() {
    return ["viewbox", "title", "size"];
  }

  public attributeChangedCallback(
    name: string,
    _oldValue: string,
    newValue: string,
  ) {
    switch (name) {
      case "viewbox":
        this._viewBox = newValue;

        break;

      case "title":
        this.title = newValue;
        this._srTitle = newValue;

        break;

      case "size":
        if (newValue == null) this._size = "auto";
        else this._size = newValue === "auto" ? "auto" : parseInt(newValue, 10);

        break;

      default:
        break;
    }

    this.render();
  }

  public connectedCallback() {
    this.render();
  }

  private _getSizeStyles(size: typeof this._size) {
    const hasValidSize =
      (typeof size === "string" &&
        (size === "auto" || !Number.isNaN(Number(size)))) ||
      (typeof size === "number" && !Number.isNaN(size));

    if (!hasValidSize) {
      throw new Error(
        `[TAPSI][Icon]: Invalid size provided! (provided size: \`size=${
          typeof size === "number" ? `${size}` : `${String(size)}`
        }\`)`,
      );
    }

    return size === "auto"
      ? {
          width: "100%",
          height: "100%",
        }
      : {
          width: `${Number(size) / 16}rem`,
          height: `${Number(size) / 16}rem`,
          maxWidth: `${Number(size) / 16}rem`,
          maxHeight: `${Number(size) / 16}rem`,
        };
  }

  private _renderContent() {
    let content = "";

    if (this._srTitle) content += `<title>${this._srTitle}</title>`;
    if (this.paths) content += this.paths;

    return content;
  }

  protected render() {
    const { width, height, maxWidth, maxHeight } = this._getSizeStyles(
      this._size,
    );

    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          color: currentColor;

          display: inline-block;

          width: ${width};
          height: ${height};
          ${maxWidth ? `max-width: ${maxWidth};` : ""}
          ${maxHeight ? `max-height: ${maxHeight};` : ""}
        }
        svg {
          color: currentcolor;
          fill: currentcolor;
        }
      </style>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="${this._viewBox}"
        aria-hidden="${this._srTitle ? "false" : "true"}"
        ${this._srTitle ? 'role="img"' : ""}
        focusable="false"
      >
        ${this._renderContent()}
      </svg>
    `;
  }
}

export default BaseIcon;

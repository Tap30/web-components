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
  private _size: number | "auto" = "auto";
  protected paths?: string;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

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
        this._size = newValue === "auto" ? "auto" : parseInt(newValue, 10);

        break;

      default:
        break;
    }

    this.render();
  }

  public connectedCallback() {
    this.render();
  }

  private _getSizeStyles(size: number | "auto") {
    const hasValidSize =
      (typeof size === "number" && !Number.isNaN(size)) ||
      (typeof size === "string" && size === "auto");

    if (!hasValidSize) {
      // eslint-disable-next-line no-console
      console.error(
        `[RASTI][Icon]: Invalid size provided! (provided size: \`size=${
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
          width: `${size / 16}rem`,
          height: `${size / 16}rem`,
          minWidth: `${size / 16}rem`,
          minHeight: `${size / 16}rem`,
        };
  }

  private _renderContent() {
    let content = "";

    if (this._srTitle) content += `<title>${this._srTitle}</title>`;
    if (this.paths) content += this.paths;

    return content;
  }

  protected render() {
    const { width, height, minWidth, minHeight } = this._getSizeStyles(
      this._size,
    );

    this.shadowRoot!.innerHTML = `
      <style>
        svg {
          color: currentcolor;
          fill: currentcolor;
          width: ${width};
          height: ${height};
          min-width: ${minWidth};
          min-height: ${minHeight};
        }
      </style>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="${this._viewBox}"
        aria-hidden="${this._srTitle ? "false" : "true"}"
        role="${this._srTitle ? "img" : ""}"
        focusable="false"
      >
        ${this._renderContent()}
      </svg>
    `;
  }
}

export default BaseIcon;

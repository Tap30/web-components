import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { map } from "lit/directives/map.js";
import { range } from "lit/directives/range.js";

export class ProgressIndicator extends LitElement {
  @property({ type: Number })
  public max = 2;

  @property({ type: Number })
  public current = 0;

  protected override render() {
    return html`
      <div
        class="progressbar"
        part="progressbar"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.current}
      >
        ${map(
          range(this.max),
          index =>
            html`<div
              class=${classMap({
                step: true,
                active: index < this.current,
              })}
              part="step"
            ></div>`,
        )}
      </div>
    `;
  }
}

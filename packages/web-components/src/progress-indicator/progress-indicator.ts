import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { map } from "lit/directives/map.js";
import { range } from "lit/directives/range.js";

export class ProgressIndicator extends LitElement {
  /**
   * The total number of steps.
   */
  @property({ type: Number })
  public max = 2;

  /**
   * The current step index.
   */
  @property({ type: Number })
  public current = 0;

  private _renderSteps() {
    return map(range(this.max), index => {
      const stepClasses = classMap({
        step: true,
        active: index < this.current,
      });

      return html`<div
        class=${stepClasses}
        part="step"
      ></div>`;
    });
  }

  protected override render() {
    return html`
      <div
        class="root"
        part="progressbar"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${this.current}
      >
        ${this._renderSteps()}
      </div>
    `;
  }
}

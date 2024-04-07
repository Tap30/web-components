import { LitElement, html } from "lit";
import { property, queryAll } from "lit/decorators.js";
import { range } from "lit/directives/range.js";
import { map } from "lit/directives/map.js";

/**
 * @prop steps - total steps
 * @prop selected - current selected step
 *
 * @fires {CustomEvent} - Step indicator change event
 *
 * @csspart steps - container for the steps
 * @csspart step - step button
 */
export class StepIndicator extends LitElement {
  @property({ type: Number }) steps = 2;

  @property({ type: Number, reflect: true }) current = 0;

  private get normalizedCurrent() {
    return Math.min(this.steps - 1, this.current);
  }

  private handleClick(index: number) {
    this.current = index;
    this.dispatchEvent(
      new CustomEvent("tap-step-indicator-change", {
        detail: { current: this.normalizedCurrent },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="steps" part="steps" role="list">
        ${map(
          range(this.steps),
          (index) =>
            html`<button
              type="button"
              class="step"
              part="step"
              aria-current=${index === this.normalizedCurrent
                ? "step"
                : "false"}
              @click="${() => this.handleClick(index)}"
            ></button>`
        )}
      </div>
    `;
  }
}

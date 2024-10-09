import { html, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { map } from "lit/directives/map";
import { range } from "lit/directives/range";

export class StepIndicator extends LitElement {
  @property({ type: Number })
  public steps = 2;

  @property({ type: Number, reflect: true })
  public current = 0;

  private get _normalizedCurrent() {
    return Math.min(this.steps - 1, this.current);
  }

  private _handleClick(index: number) {
    this.current = index;
    this.dispatchEvent(
      new CustomEvent("tap-step-indicator-change", {
        detail: { current: this._normalizedCurrent },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected override render() {
    return html`
      <div
        class="steps"
        part="steps"
        role="list"
      >
        ${map(
          range(this.steps),
          index => html`
            <button
              type="button"
              class="step"
              part="step"
              aria-current=${index === this._normalizedCurrent
                ? "step"
                : "false"}
              @click="${() => this._handleClick(index)}"
            ></button>
          `,
        )}
      </div>
    `;
  }
}

import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { range } from 'lit/directives/range.js';
import { map } from 'lit/directives/map.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * @prop steps - total steps
 * @prop selected - current selected step
 *
 * @fires {CustomEvent} - Step indicator change event
 *
 * @csspart steps - container for the steps
 * @csspart step - step button
 */
export class ProgressIndicator extends LitElement {
  @property({ type: Number }) max = 2;

  @property({ type: Number }) current = 0;

  render() {
    return html`
      <div
        class="progressbar"
        part="progressbar"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="max"
        aria-valuenow=${this.current}
      >
        ${map(
          range(this.max),
          (index) =>
            html`<div
              role="presentation"
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

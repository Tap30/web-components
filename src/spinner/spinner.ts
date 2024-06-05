import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export class Spinner extends LitElement {
  @property() variant: 'normal' | 'inverse' | 'inherit' = 'inherit';

  render() {
    return html`
      <svg
        part="svg"
        class=${classMap({
          spinner: true,
          [this.variant]: true,
        })}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 600 600"
      >
        <defs>
          <linearGradient id="Gradient1" gradientTransform="rotate(90)">
            <stop offset="0%" stop-opacity="1" stop-color="currentColor" />
            <stop offset="100%" stop-opacity="0.5" stop-color="currentColor" />
          </linearGradient>
          <linearGradient id="Gradient2" gradientTransform="rotate(90)">
            <stop offset="0%" stop-opacity="0" stop-color="currentColor" />
            <stop offset="90%" stop-opacity="0.5" stop-color="currentColor" />
            <stop offset="100%" stop-opacity="0.65" stop-color="currentColor" />
          </linearGradient>
          <pattern
            id="Pattern"
            x="0"
            y="0"
            width="600"
            height="600"
            patternUnits="userSpaceOnUse"
          >
            <g>
              <rect
                shape-rendering="crispEdges"
                x="0"
                y="0"
                width="300"
                height="600"
                fill="url(#Gradient1)"
              />
              <rect
                shape-rendering="crispEdges"
                x="300"
                y="0"
                width="300"
                height="600"
                fill="url(#Gradient2)"
              />
            </g>
          </pattern>
        </defs>
        <path
          class="rotating"
          style="stroke: url(#Pattern);"
          fill="transparent"
          stroke-width="80"
          d="M 364 58 A 250 250 0 1 1 235 58"
        />
      </svg>
    `;
  }
}

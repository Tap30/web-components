import { LitElement, html, nothing } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import { Radio } from '../radio/radio';

export class RadioGroup extends LitElement {
  @property({ reflect: true }) direction: 'horizontal' | 'vertical' =
    'vertical';
  @property({ reflect: true }) value = '';

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('radio-input-change', this.handleRadioChangeClick);
  }

  public get radios(): Radio[] {
    const slot = this.shadowRoot!.querySelector('slot');
    const elements = slot!.assignedElements({ flatten: true });

    const radios = elements.map((element: Element) => {
      if (!(element instanceof Radio) && element instanceof Element) {
        return element.querySelector('tap-radio') as Radio | null;
      } else {
        return element;
      }
    }).filter(Boolean);

    return radios as Radio[];
  }

  private selectDefaultOption() {
    if (!this.value) return;
    const selectedRadio = this.radios.find(
      (radio) => radio.value == this.value,
    );
    if (!selectedRadio) return;
    selectedRadio.checked = true;
  }

  private handleRadioChangeClick(e: Event) {
    const index = this.radios.indexOf(e.target as Radio);
    const selectedRadio = this.radios[index];

    if (!selectedRadio || selectedRadio.checked || selectedRadio.disabled)
      return;

    selectedRadio.checked = true;

    this.radios.forEach((radio) => {
      if (radio !== selectedRadio) {
        radio.checked = false;
      }
    });

    this.dispatchEvent(
      new CustomEvent('radio-group-change', {
        detail: {
          checked: selectedRadio,
          index,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div
        role="group"
        class="radio-group"
        part="radio-group"
        aria-label=${nothing}
      >
        <slot @slotchange="${this.selectDefaultOption}"></slot>
      </div>
    `;
  }
}

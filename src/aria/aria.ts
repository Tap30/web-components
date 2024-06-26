/**
 * An extension of `ARIAMixin` that enforces strict value types for aria
 * properties.
 *
 * This is needed for correct typing in render functions with lit analyzer.
 *
 * @example
 * render() {
 *   const {ariaLabel} = this as ARIAMixinStrict;
 *   return html`
 *     <tap-botton aria-label=${ariaLabel || nothing}>title</tap-button>
 *   `;
 * }
 */
export interface ARIAMixinStrict extends ARIAMixin {
  ariaAtomic: 'true' | 'false' | null;
  ariaAutoComplete: 'none' | 'inline' | 'list' | 'both' | null;
  ariaBusy: 'true' | 'false' | null;
  ariaChecked: 'true' | 'false' | null;
  ariaColCount: `${number}` | null;
  ariaColIndex: `${number}` | null;
  ariaColSpan: `${number}` | null;
  ariaCurrent:
    | 'page'
    | 'step'
    | 'location'
    | 'date'
    | 'time'
    | 'true'
    | 'false'
    | null;
  ariaDisabled: 'true' | 'false' | null;
  ariaExpanded: 'true' | 'false' | null;
  ariaHasPopup:
    | 'false'
    | 'true'
    | 'menu'
    | 'listbox'
    | 'tree'
    | 'grid'
    | 'dialog'
    | null;
  ariaHidden: 'true' | 'false' | null;
  ariaInvalid: 'true' | 'false' | null;
  ariaKeyShortcuts: string | null;
  ariaLabel: string | null;
  ariaLevel: `${number}` | null;
  ariaLive: 'assertive' | 'off' | 'polite' | null;
  ariaModal: 'true' | 'false' | null;
  ariaMultiLine: 'true' | 'false' | null;
  ariaMultiSelectable: 'true' | 'false' | null;
  ariaOrientation: 'horizontal' | 'vertical' | 'undefined' | null;
  ariaPlaceholder: string | null;
  ariaPosInSet: `${number}` | null;
  ariaPressed: 'true' | 'false' | null;
  ariaReadOnly: 'true' | 'false' | null;
  ariaRequired: 'true' | 'false' | null;
  ariaRoleDescription: string | null;
  ariaRowCount: `${number}` | null;
  ariaRowIndex: `${number}` | null;
  ariaRowSpan: `${number}` | null;
  ariaSelected: 'true' | 'false' | null;
  ariaSetSize: `${number}` | null;
  ariaSort: 'ascending' | 'descending' | 'none' | 'other' | null;
  ariaValueMax: `${number}` | null;
  ariaValueMin: `${number}` | null;
  ariaValueNow: `${number}` | null;
  ariaValueText: string | null;
}

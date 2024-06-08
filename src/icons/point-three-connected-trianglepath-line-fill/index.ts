import { customElement } from 'lit/decorators.js';
import { PointThreeConnectedTrianglepathLineFillIcon } from './point-three-connected-trianglepath-line-fill';

@customElement('tap-icon-point-three-connected-trianglepath-line-fill')
export class TapIconPointThreeConnectedTrianglepathLineFill extends PointThreeConnectedTrianglepathLineFillIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-point-three-connected-trianglepath-line-fill': TapIconPointThreeConnectedTrianglepathLineFill;
  }
}

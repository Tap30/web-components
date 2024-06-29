import { customElement } from 'lit/decorators.js';
import { PointThreeConnectedTrianglepathLineIcon } from './point-three-connected-trianglepath-line';

@customElement('tap-icon-point-three-connected-trianglepath-line')
export class TapIconPointThreeConnectedTrianglepathLine extends PointThreeConnectedTrianglepathLineIcon {}

declare global {
  interface HTMLElementTagNameMap {
    'tap-icon-point-three-connected-trianglepath-line': TapIconPointThreeConnectedTrianglepathLine;
  }
}

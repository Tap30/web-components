import { customElement } from "lit/decorators.js";
import { Spinner } from "./spinner";
import styles from "./spinner.style";

/** 
* ### Example
* 
* 
* ##### Simple
*
* ```html
* <tap-spinner />
* ```
*
* ##### Variant
*
* ```html
* <tap-spinner variant="inverse" />
* ```
*
* @summary Display spinner.
*
* @prop {string} [variant='primary'] - Specifies the spinner color. Acceptable values are [primary , inverse] .
*/

@customElement("tap-spinner")
export class TapSpinner extends Spinner {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-spinner": TapSpinner;
  }
}

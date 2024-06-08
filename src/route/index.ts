import { customElement } from "lit/decorators.js";
import { Route} from "./route";
import styles from "./route.style";

@customElement("tap-route")
export class TapRoute extends Route {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "tap-route": TapRoute;
  }
}

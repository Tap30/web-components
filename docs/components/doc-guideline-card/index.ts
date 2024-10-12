import { customElement } from "lit/decorators.js";
import { GuidelineCard } from "./doc-guideline-card";
import styles from "./doc-guideline-card.style";

@customElement("doc-guideline-card")
export class DocGuidelineCard extends GuidelineCard {
  public static override readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "doc-guideline-card": DocGuidelineCard;
  }
}

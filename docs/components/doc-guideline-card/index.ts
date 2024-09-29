import { customElement } from 'lit/decorators.js';
import styles from './doc-guideline-card.style';
import {GuidelineCard} from "./doc-guideline-card";

@customElement('doc-guideline-card')
export class DocGuidelineCard extends GuidelineCard {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'doc-guideline-card': DocGuidelineCard;
  }
}

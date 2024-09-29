import { customElement } from 'lit/decorators.js';
import {GuidelineSection} from "./doc-guideline-section.js";
import styles from './doc-guideline-section.style.js';

@customElement('doc-guideline-section')
export class DocGuidelineSection extends GuidelineSection {
  static readonly styles = [styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'doc-guideline-section': DocGuidelineSection;
  }
}

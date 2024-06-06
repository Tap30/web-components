import fs from 'node:fs';
import type { Package, CustomElement, PropertyLike } from 'custom-elements-manifest';
import getColorTokensReferenceContent from "../utils/getColorTokensReferenceContent";
import getCssPartsReferenceContent from "../utils/getCssPartsReferenceContent";
import getComponentsTokensReferenceContent from "../utils/getComponentsTokensReferenceContent";



// TODO: refactor





export default {
  paths() {
    return [
      { params: { 'reference': 'css-parts' }, content: getCssPartsReferenceContent() },
      { params: { 'reference': 'components-tokens' }, content: getComponentsTokensReferenceContent() },
      { params: { 'reference': 'color-tokens' }, content: getColorTokensReferenceContent() },
    ]
  },
};

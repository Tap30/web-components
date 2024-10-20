import getColorTokensReferenceContent from "../../utils/getColorTokensReferenceContent";
import getComponentsTokensReferenceContent from "../../utils/getComponentsTokensReferenceContent";
import getCssPartsReferenceContent from "../../utils/getCssPartsReferenceContent";
import getRadiusTokensReferenceContent from "../../utils/getRadiusTokensReferenceContent";
import getSpacingTokensReferenceContent from "../../utils/getSpacingTokensReferenceContent";
import getStrokeTokensReferenceContent from "../../utils/getStrokeTokensReferenceContent";
import getTypographyTokensReferenceContent from "../../utils/getTypographyTokensReferenceContent";

export default {
  paths() {
    return [
      {
        params: { reference: "css-parts" },
        content: getCssPartsReferenceContent(),
      },
      {
        params: { reference: "components-tokens" },
        content: getComponentsTokensReferenceContent(),
      },
      {
        params: { reference: "color-tokens" },
        content: getColorTokensReferenceContent(),
      },
      {
        params: { reference: "radius-tokens" },
        content: getRadiusTokensReferenceContent(),
      },
      {
        params: { reference: "spacing-tokens" },
        content: getSpacingTokensReferenceContent(),
      },
      {
        params: { reference: "stroke-tokens" },
        content: getStrokeTokensReferenceContent(),
      },
      {
        params: { reference: "typography-tokens" },
        content: getTypographyTokensReferenceContent(),
      },
    ];
  },
};

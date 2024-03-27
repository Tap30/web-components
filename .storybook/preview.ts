import type { Preview } from "@storybook/web-components";

import "../styles/font.css";
import "../styles/theme.css";

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
  },
};
export default preview;

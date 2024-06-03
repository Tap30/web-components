import type { Preview } from "@storybook/web-components";
import { setCustomElementsManifest } from '@storybook/web-components';
import "../styles/font.css";
import "../styles/theme.css";
import DocTemplate from "./DocTemplate.mdx"
// setCustomElementsManifest('../dist/custom-element.json')

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    docs: {
      page: DocTemplate,
      toc: {
        ignoreSelector: '#primary',
        disable: false,
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: '#ffffff',
        },
        {
          name: 'black',
          value: '#000000',
        },
      ], // TODO: add other tokens from design system
    }
  },
};

export default preview;

import { type Preview } from "@storybook/react-vite";

// Resolves to `packages/theme/src/default-theme/tokens.css` via the root
// tsconfig `paths`, so token edits hot-reload.
import "@tapsioss/theme/css-variables";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ["Introduction", "Theme", "React UI"],
      },
    },
    a11y: {
      test: "todo",
    },
  },

  // The design system is RTL-first, matching the playground.
  globalTypes: {
    direction: {
      description: "Text direction",
      defaultValue: "rtl",
      toolbar: {
        title: "Direction",
        icon: "transfer",
        items: [
          { value: "rtl", title: "RTL" },
          { value: "ltr", title: "LTR" },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const direction = (context.globals as { direction?: string }).direction;

      document.documentElement.setAttribute("dir", direction ?? "rtl");

      return Story();
    },
  ],
};

export default preview;

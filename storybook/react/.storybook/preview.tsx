import { type Preview } from "@storybook/react-vite";
import { StoryFrame } from "../src/StoryFrame.tsx";

// All four themes, plus the primitives they share. Resolves to
// `packages/theme/src/**` via the root tsconfig `paths`, so token edits
// hot-reload with no rebuild.
//
// Importing several themes is what the attribute scoping exists for. Each file
// declares its tokens twice — once on `:root` and once on
// `[data-tapsi-theme="ride-light"]` — so a subtree takes whichever theme
// its nearest ancestor names. The `StoryFrame` decorator below supplies that
// ancestor.
//
// Import order does not matter: custom properties are substituted at
// computed-value time, after the whole cascade.
import "@tapsioss/theme/drive/dark.css";
import "@tapsioss/theme/drive/light.css";
import "@tapsioss/theme/ride/dark.css";
import "@tapsioss/theme/ride/light.css";
import "@tapsioss/theme/tokens.css";

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
        order: ["Introduction", "Theme", "React Icons", "React UI"],
      },
    },
    a11y: {
      test: "todo",
    },
  },

  // Direction, theme and font rendering are deliberately NOT toolbar globals.
  // They are settings of the container a story renders in, chosen from the
  // bar on top of each story — see `src/StoryFrame.tsx` for why. Storybook's
  // own document stays LTR and unthemed.
  decorators: [
    Story => (
      <StoryFrame>
        <Story />
      </StoryFrame>
    ),
  ],
};

export default preview;

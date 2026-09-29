import { type Preview } from "@storybook/react-vite";
import {
  THEMES,
  ThemeProvider,
  type Theme,
} from "../src/theme/ThemeProvider.tsx";

// All four themes, plus the primitives they share. Resolves to
// `packages/theme/src/**` via the root tsconfig `paths`, so token edits
// hot-reload with no rebuild.
//
// Importing several themes is what the attribute scoping exists for. Each file
// declares its tokens twice — once on `:root` and once on
// `[data-tapsi-theme="ride-light"]` — so a subtree takes whichever theme
// its nearest ancestor names. The `ThemeProvider` decorator below supplies that
// ancestor.
//
// Import order does not matter: custom properties are substituted at
// computed-value time, after the whole cascade.
import "@tapsioss/theme/drive/dark.css";
import "@tapsioss/theme/drive/light.css";
import "@tapsioss/theme/ride/dark.css";
import "@tapsioss/theme/ride/light.css";
import "@tapsioss/theme/tokens.css";

type Globals = {
  direction?: string;
  theme?: Theme;
  layout?: "single" | "matrix";
};

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

  globalTypes: {
    theme: {
      description: "Which token set to render in",
      defaultValue: "ride-light",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: THEMES.map(value => ({ value, title: value })),
        dynamicTitle: true,
      },
    },
    layout: {
      description: "Render one theme, or all four at once",
      defaultValue: "single",
      toolbar: {
        title: "Layout",
        icon: "grid",
        items: [
          { value: "single", title: "Single theme" },
          { value: "matrix", title: "All four themes" },
        ],
        dynamicTitle: true,
      },
    },
    // The design system is RTL-first, matching the playground.
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
      const globals = context.globals as Globals;

      document.documentElement.setAttribute("dir", globals.direction ?? "rtl");

      // Docs pages render every story on one page and have their own prose
      // around them; a 2×2 matrix per story there is noise rather than help.
      const isMatrix =
        globals.layout === "matrix" && context.viewMode !== "docs";

      if (!isMatrix) {
        return (
          <ThemeProvider
            theme={globals.theme ?? "ride-light"}
            surface
            style={{ padding: "1rem" }}
          >
            <Story />
          </ThemeProvider>
        );
      }

      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "1px",
            background: "var(--tapsi-palette-gray-300)",
            border: "1px solid var(--tapsi-palette-gray-300)",
          }}
        >
          {THEMES.map(theme => (
            <ThemeProvider
              key={theme}
              theme={theme}
              surface
              style={{ padding: "1rem", display: "grid", gap: "0.75rem" }}
            >
              <div
                style={{
                  font: "600 0.75rem ui-monospace, monospace",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--tapsi-color-content-tertiary)",
                }}
              >
                {theme}
              </div>
              <Story />
            </ThemeProvider>
          ))}
        </div>
      );
    },
  ],
};

export default preview;

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { THEMES, ThemeProvider, type Theme } from "./theme/ThemeProvider.tsx";

/**
 * The container every story renders in: a settings bar, and below it the
 * story itself.
 *
 * The settings — direction, theme, font rendering — belong to THIS container,
 * not to Storybook. That is the point of it: the design system is RTL-first,
 * so a component has to be shown RTL by default, but Storybook's own chrome
 * (sidebar, docs prose, the Controls panel) is English and must stay LTR. A
 * toolbar global that sets `dir` on the document cannot do both. The same goes
 * for the theme: it is a property of the surface the component sits on, not of
 * the page around it.
 *
 * So nothing here touches `document`. Each frame keeps its own state, which
 * also means that on a Docs page — where several stories share one document —
 * each can be set independently.
 */

type Direction = "rtl" | "ltr";

/** One theme, or all four side by side. */
type ThemeChoice = Theme | "all";

type Settings = {
  direction: Direction;
  theme: ThemeChoice;
  fontSmoothing: boolean;
};

/** RTL and the PWA's font rendering, because that is how the product ships. */
const DEFAULTS: Settings = {
  direction: "rtl",
  theme: "ride-light",
  fontSmoothing: true,
};

const STORAGE_KEY = "tapsi-storybook-story-frame";

const DIRECTIONS: readonly Direction[] = ["rtl", "ltr"];
const THEME_CHOICES: readonly ThemeChoice[] = [...THEMES, "all"];

const isOneOf = <T extends string>(
  options: readonly T[],
  value: unknown,
): value is T => options.some(option => option === value);

/**
 * The last settings chosen, so they carry over from one story to the next
 * instead of resetting on every click in the sidebar. Storage can be missing or
 * throw (private windows, blocked site data), and what it holds is not trusted
 * — anything unusable falls back to the default for that setting.
 */
const readSettings = (): Settings => {
  try {
    const stored: unknown = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) ?? "{}",
    );

    if (typeof stored !== "object" || stored === null) return DEFAULTS;

    const direction: unknown = Reflect.get(stored, "direction");
    const theme: unknown = Reflect.get(stored, "theme");
    const fontSmoothing: unknown = Reflect.get(stored, "fontSmoothing");

    return {
      direction: isOneOf(DIRECTIONS, direction)
        ? direction
        : DEFAULTS.direction,
      theme: isOneOf(THEME_CHOICES, theme) ? theme : DEFAULTS.theme,
      fontSmoothing:
        typeof fontSmoothing === "boolean"
          ? fontSmoothing
          : DEFAULTS.fontSmoothing,
    };
  } catch {
    return DEFAULTS;
  }
};

const writeSettings = (settings: Settings) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Not persisted; the frame still works for this story.
  }
};

/*
 * The bar is Storybook chrome, not part of the design system, so it is styled
 * with fixed neutral values rather than `--tapsi-*` tokens: it must look the
 * same whichever theme the story below it is in, and it sits outside the
 * element that carries the theme.
 */
const CHROME = {
  border: "#d9dcde",
  barBackground: "#f6f7f8",
  text: "#2e3438",
  mutedText: "#6b747b",
  buttonBackground: "#ffffff",
  selectedBackground: "#2e3438",
  selectedText: "#ffffff",
} as const;

const frameStyle: CSSProperties = {
  border: `1px solid ${CHROME.border}`,
  borderRadius: "8px",
  overflow: "hidden",
  // Wide enough for the bar in a `layout: "centered"` story, where the frame
  // would otherwise shrink to the component.
  minInlineSize: "min(100%, 22rem)",
};

const barStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "0.5rem 1rem",
  padding: "0.5rem 0.75rem",
  background: CHROME.barBackground,
  borderBlockEnd: `1px solid ${CHROME.border}`,
  color: CHROME.text,
  font: "500 0.75rem/1.25 system-ui, sans-serif",
};

const groupStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.375rem",
};

const groupLabelStyle: CSSProperties = { color: CHROME.mutedText };

const buttonsStyle: CSSProperties = {
  display: "inline-flex",
  border: `1px solid ${CHROME.border}`,
  borderRadius: "6px",
  overflow: "hidden",
};

const buttonStyle = (selected: boolean, first: boolean): CSSProperties => ({
  appearance: "none",
  margin: 0,
  padding: "0.25rem 0.5rem",
  border: "none",
  borderInlineStart: first ? "none" : `1px solid ${CHROME.border}`,
  background: selected ? CHROME.selectedBackground : CHROME.buttonBackground,
  color: selected ? CHROME.selectedText : CHROME.text,
  font: "inherit",
  cursor: "pointer",
});

type ButtonGroupProps<T extends string> = {
  label: string;
  options: readonly { value: T; title: string }[];
  value: T;
  onChange: (value: T) => void;
};

const ButtonGroup = <T extends string>({
  label,
  options,
  value,
  onChange,
}: ButtonGroupProps<T>) => (
  <div
    role="group"
    aria-label={label}
    style={groupStyle}
  >
    <span
      aria-hidden="true"
      style={groupLabelStyle}
    >
      {label}
    </span>
    <span style={buttonsStyle}>
      {options.map((option, index) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          style={buttonStyle(option.value === value, index === 0)}
          onClick={() => {
            onChange(option.value);
          }}
        >
          {option.title}
        </button>
      ))}
    </span>
  </div>
);

const DIRECTION_OPTIONS = [
  { value: "rtl", title: "RTL" },
  { value: "ltr", title: "LTR" },
] as const;

const THEME_OPTIONS = [
  ...THEMES.map(value => ({ value, title: value })),
  { value: "all", title: "All four" },
] as const;

const SMOOTHING_OPTIONS = [
  { value: "pwa", title: "Smooth (PWA)" },
  { value: "default", title: "Browser default" },
] as const;

const themeLabelStyle: CSSProperties = {
  font: "600 0.75rem ui-monospace, monospace",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "var(--tapsi-color-content-tertiary)",
  // The label is chrome inside a themed surface: always LTR, like the bar.
  direction: "ltr",
};

export type StoryFrameProps = {
  /** The story. Rendered once, or once per theme with "All four". */
  children: ReactNode;
};

export const StoryFrame = ({ children }: StoryFrameProps) => {
  const [settings, setSettings] = useState(readSettings);

  // Functional, so two changes in the same tick build on each other instead
  // of both starting from the same stale settings.
  const update = (change: Partial<Settings>) => {
    setSettings(current => ({ ...current, ...change }));
  };

  useEffect(() => {
    writeSettings(settings);
  }, [settings]);

  /**
   * The surface the story sits on. `dir` goes HERE — on the story's own
   * container, never on the document — and `surface` paints the theme's
   * background so a dark theme reads as dark.
   */
  const renderSurface = (theme: Theme, labelled: boolean) => (
    <ThemeProvider
      key={theme}
      theme={theme}
      surface
      fontSmoothing={settings.fontSmoothing}
      dir={settings.direction}
      data-story-surface={theme}
      style={{ padding: "1rem", display: "grid", gap: "0.75rem" }}
    >
      {labelled ? <div style={themeLabelStyle}>{theme}</div> : null}
      {/*
        A plain block, so the story is laid out as it would be in a page. The
        surface itself is a grid (for the label's gap), and a grid STRETCHES
        its items — a Button with `fullWidth` off would fill the frame anyway.
      */}
      <div data-story-root="">{children}</div>
    </ThemeProvider>
  );

  const renderStory = () => {
    if (settings.theme !== "all") return renderSurface(settings.theme, false);

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "1px",
          background: CHROME.border,
        }}
      >
        {THEMES.map(theme => renderSurface(theme, true))}
      </div>
    );
  };

  return (
    // Explicitly LTR: the frame's chrome is English whatever its ancestors say.
    <div
      dir="ltr"
      style={frameStyle}
      data-story-frame=""
    >
      <div
        role="toolbar"
        aria-label="Story settings"
        style={barStyle}
      >
        <ButtonGroup
          label="Direction"
          options={DIRECTION_OPTIONS}
          value={settings.direction}
          onChange={direction => {
            update({ direction });
          }}
        />
        <ButtonGroup
          label="Theme"
          options={THEME_OPTIONS}
          value={settings.theme}
          onChange={theme => {
            update({ theme });
          }}
        />
        <ButtonGroup
          label="Text"
          options={SMOOTHING_OPTIONS}
          value={settings.fontSmoothing ? "pwa" : "default"}
          onChange={smoothing => {
            update({ fontSmoothing: smoothing === "pwa" });
          }}
        />
      </div>
      {renderStory()}
    </div>
  );
};

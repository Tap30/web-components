# AGENTS.md — `@tapsioss/theme`

Guidance for AI agents working on design tokens in this package.

**This file is the specification.** There is no generator script. Everything
under `src/` is committed source, produced by applying the rules below to the
exports in `figma-output-jsons/`. Follow this file exactly and the output is
reproducible; deviate and `pnpm check` will tell you.

Read this file end to end before changing anything under `src/`.

---

## 1. Source of truth

**`figma-output-jsons/` is authoritative for token names and values. Nothing
else is.**

Not the Figma MCP, not a Figma export you produce yourself, not the existing
files under `src/`. Figma's own variable export flattens cross-collection
references to literals, which destroys the layering this package exists to
express — so the design team exports these files with a custom plugin instead.

Consequences you must respect:

- **Never invent a token.** If it is not in the JSON, it does not exist.
- **Never "fix" a value** that looks wrong. Report it; the fix belongs in Figma.
- **Never read tokens from the Figma MCP.** At the time of writing the MCP
  returns flattened values and cannot see these collections' aliases. If you
  need to confirm something, ask for a fresh export.
- `figma-output-jsons/` **must never ship**. `package.json` uses a `files`
  allowlist (`dist`, `README.md`), which already excludes it. Do not add it.

## 2. The model — two layers

```
figma-output-jsons/primitive.json            →  src/tokens.{css,ts}          literal values
figma-output-jsons/<product>-theme-tokens/   →  src/<product>/<theme>.{css,ts}  → references
```

A consumer imports **exactly two stylesheets**: the primitives once, and one
theme on top.

```css
@import "@tapsioss/theme/tokens.css"; /* primitives   */
@import "@tapsioss/theme/ride/light.css"; /* the theme    */
```

```ts
import { tokens } from "@tapsioss/theme/ride/light";
```

Components reference **theme** tokens only (`--tapsi-color-surface-primary`),
never primitives (`--tapsi-palette-gray-white`). That is what lets one component
render as ride-light or drive-dark with no code change, and it is the property
`check.ts` exists to protect.

The import order does not matter. CSS substitutes custom properties at
computed-value time, after the whole cascade, so a `var()` in the theme file
resolves against a primitive declared later just as well.

### Collections

| Collection | Top-level groups                   | Varies by      |
| ---------- | ---------------------------------- | -------------- |
| primitive  | `Palette`, `Font`, `Number`        | nothing        |
| theme      | `Color`, `Typography`, `Dimension` | product × mode |

The two collections' group names are disjoint, so names can never collide
between layers.

Within a theme, only **`Color`** actually differs between products and modes.
`Typography` and `Dimension` are currently byte-identical across all four
exports. They are nevertheless **duplicated into every theme file** by explicit
decision, so that each theme file is self-contained and mirrors exactly one
Figma export. Do not factor them out into a shared file.

## 3. Naming

**A token's name is its Figma path, kebab-cased, prefixed `--tapsi-`. Nothing
else.**

The layer, collection, product and theme are **never** part of the name. A
designer searching for a token must find the same string in Figma and in the
CSS.

| Figma path                                            | CSS                                                           | TS                                                   |
| ----------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------- |
| `Palette/Gray/White`                                  | `--tapsi-palette-gray-white`                                  | `palette.gray.white`                                 |
| `Palette/Gray/50`                                     | `--tapsi-palette-gray-50`                                     | `palette.gray["50"]`                                 |
| `Palette/Alpha/Dark50`                                | `--tapsi-palette-alpha-dark50`                                | `palette.alpha.dark50`                               |
| `Font/Size/16`                                        | `--tapsi-font-size-16`                                        | `font.size["16"]`                                    |
| `Number/999`                                          | `--tapsi-number-999`                                          | `number["999"]`                                      |
| `Color/Surface/Accent-Light`                          | `--tapsi-color-surface-accent-light`                          | `color.surface.accentLight`                          |
| `Color/Content/On-Brand`                              | `--tapsi-color-content-on-brand`                              | `color.content.onBrand`                              |
| `Color/Component/Button/Surface/CTA`                  | `--tapsi-color-component-button-surface-cta`                  | `color.component.button.surface.cta`                 |
| `Typography/Font-Size/Body-2xSmall`                   | `--tapsi-typography-font-size-body-2x-small`                  | `typography.fontSize.body2xSmall`                    |
| `Dimension/Radius/2xLarge`                            | `--tapsi-dimension-radius-2x-large`                           | `dimension.radius["2xLarge"]`                        |
| `Dimension/Component/Button/Padding/Small-Horizontal` | `--tapsi-dimension-component-button-padding-small-horizontal` | `dimension.component.button.padding.smallHorizontal` |

**Segmentation.** Split on `-`, `_`, `/` and whitespace, then on camel/Pascal
humps. A digit run stays attached to a _following_ lowercase letter, so
`2xSmall` → `2x-small`, not `2-x-small`; a _trailing_ digit run stays attached
to what precedes it, so `Dark50` → `dark50`. An all-caps run followed by a
capitalised word splits between them (`CTALabel` → `cta-label`).

**TS keys.** Each kebab segment is camelCased. A purely numeric segment stays as
written (`"50"`, `"400"`, `"999"`) so it reads as the scale step it is, and is
accessed with brackets. A key that begins with a digit (`"2xLarge"`) likewise
needs brackets.

## 4. Value rules

| Figma value         | Output                                                   |
| ------------------- | -------------------------------------------------------- |
| 6-digit hex         | lowercase hex — `#ffffff`                                |
| 8-digit hex (alpha) | `rgba(r, g, b, a)` — `#00000080` → `rgba(0, 0, 0, 0.5)`  |
| number              | rem, divided by 16 — `16` → `1rem`, `0` → `0` (unitless) |
| string              | a reference, unless it is one of the two cases below     |

Four transforms are **not** one-to-one. Getting these wrong produces valid CSS
that behaves incorrectly, so re-check them after any update.

**Alpha colours become `rgba()`, not 8-digit hex and not `rgb(r g b / a)`.**
This system targets older Android WebViews, where both of those render as fully
transparent rather than falling back. `rgba()` is the only notation that
degrades safely. Alpha is rounded to two decimals.

**Font weights are names in Figma, numbers in CSS.** `Font/Weight/400` has the
value `"Regular"`, and `font-weight: Regular` is invalid. **The group's _key_ is
the real value**; the string is a Figma label and is discarded.

| Thin | ExtraLight | Light | Regular | Medium | SemiBold | Bold | ExtraBold | Black |
| ---- | ---------- | ----- | ------- | ------ | -------- | ---- | --------- | ----- |
| 100  | 200        | 300   | 400     | 500    | 600      | 700  | 800       | 900   |

So `--tapsi-font-weight-400: 400`. The tautology is deliberate: the name is the
Figma path, and the value is what CSS needs.

**Font families get a generic fallback.** `Font/Family/Base` →
`"Vazirmatn", sans-serif`; `Font/Family/Mono` → `"Vazirmatn", monospace`. In TS
the outer string is single-quoted so prettier does not escape the inner quotes:
`'"Vazirmatn", sans-serif'`.

**rem conversion happens once, here, at the Figma boundary.** CSS and TS carry
the _same_ string. Never ship a px value and convert later, and never expose a
conversion helper — `src/types.ts` types lengths as `RemValue`, so a px value
fails to compile.

There is **no `Radius/Full` sentinel**. `Dimension/Radius/Full` references
`Number/999`, which is `62.4375rem`, and that is what ships. It is large enough
to render as a pill on any real element.

## 5. Reference resolution

Unlike Figma's own export, these JSONs **preserve every alias** as a dotted path
string. There is no matching by value, and no ambiguity to resolve.

A string value is a **reference** if it resolves as a path in the primitive
collection or in its own file. Everything else is a literal.

```jsonc
"Primary": "Palette.Gray.White"     // → var(--tapsi-palette-gray-white)
"On-Warning": "Color.Content.Primary" // → var(--tapsi-color-content-primary)
"Small": "Dimension.Radius.Full"    // → var(--tapsi-dimension-radius-full)
```

**Emit one hop, never a flattened value.** `Color/Component/Button/Surface/CTA`
references `Color.Surface.Brand`, so it emits `var(--tapsi-color-surface-brand)`
— not the orange it happens to resolve to. Preserving the hop is what carries
the designer's intent and keeps the override point available.

**If a reference does not resolve, stop and report it.** Do not inline a literal
to make it work.

### The one exception: line heights

All 17 `Typography/Line-Height/*` values are raw numbers in the export, not
references, so they are literals in the theme layer by design. Three of them
(30, 42, 60) are not on the `Number` scale at all and could not be references
even in principle.

This is the **only** sanctioned literal outside the primitive layer. `check.ts`
enforces that; a literal anywhere else fails the build.

## 6. Output shape

One `.css` and one `.ts` per set. Do not split by group into separate files.

```
src/tokens.css              src/tokens.ts               primitives
src/<product>/<theme>.css   src/<product>/<theme>.ts    one theme
```

**CSS and TS are independent artifacts of the same rules. Neither is derived
from the other, and neither imports the other.** They solve the same problem two
ways:

|     | composes                   | how                                                  |
| --- | -------------------------- | ---------------------------------------------------- |
| CSS | at runtime, in the browser | `var()` chains — the consumer imports two files      |
| TS  | at import time             | real values, resolved by JS reference to `tokens.ts` |

A `var(--tapsi-…)` string must **never** appear in a `.ts` file. Someone reading
`number["8"]` wants `"0.5rem"`, not a custom property they cannot compute with.

Editing one does not move the other. `check.ts` fails the build if they
disagree.

### CSS selectors

Each file declares its tokens under an exact, required selector list. Nothing
else, and no second rule block.

| File                    | Selector                                        |
| ----------------------- | ----------------------------------------------- |
| `tokens.css`            | `:root`                                         |
| `<product>/<theme>.css` | `:root, [data-tapsi-theme="<product>-<theme>"]` |

Primitives are theme-invariant, so they are global and **never** scoped.

A theme is declared **twice, on purpose**:

- **`:root`** makes the single-theme case need no setup. Import one theme and
  everything works, which is why a `ThemeProvider` is optional for consumers and
  why this package ships none.
- **the attribute** makes the theme swappable at runtime and, more importantly,
  lets several themes render on the same page — a subtree takes whichever theme
  its nearest ancestor declares.

**One attribute, not two.** A theme is a product/mode pair, the token files are
per pair, and so is the value: `data-tapsi-theme="ride-light"`. Do not split it
into separate product and mode attributes — the consumer-facing selection is
meant to match the way the sets are actually built.

That nesting works because custom properties resolve by **inheritance**, not by
specificity: `:root` and `[data-tapsi-theme]` never compete, since they match
different elements and the nearer one simply wins for its subtree. Do not try to
"fix" the apparent specificity clash.

When several themes are imported, the bare `:root` of whichever loaded last
applies to unwrapped content. That is expected; an app in that situation sets
the attribute on `<html>`.

`check.ts` asserts this list exactly, because the rest of it reads declarations
by regex and is otherwise selector-blind — a theme that lost its scoped selector
would still resolve globally and look completely fine until someone tried to
render two themes at once.

### `src/tokens.ts` — primitives

One named const per Figma group, each closed with `as const satisfies <Type>`,
then an aggregate `tokens`:

```ts
export const palette = { … } as const satisfies PaletteTokens;
export const font = { … } as const satisfies FontTokens;
export const number = { … } as const satisfies NumberTokens;

export const tokens = { palette, font, number } as const satisfies PrimitiveTokens;
```

### `src/<product>/<theme>.ts` — one theme

Imports the primitives and resolves every reference **by JS reference**, so the
TS mirrors the CSS `var()` chain without depending on it:

```ts
import { font, number, palette } from "../tokens.ts";

// Hoisted, because tokens in other groups reference them.
const surface = { primary: palette.gray.white, … } as const;
const content = { … } as const;
const radius = { full: number["999"], … } as const;

export const color = {
  surface,
  content,
  border: { … },
  overlay: { … },
  component: { button: { surface: { cta: surface.brand } } },
} as const satisfies ColorTokens;

export const typography = { … } as const satisfies TypographyTokens;
export const dimension = { radius, layout: { … }, component: { … } } as const satisfies DimensionTokens;

export const tokens = { color, typography, dimension } as const satisfies ThemeTokens;
```

**Hoist a group into a module-local const when another group references it** —
currently `Color/Surface`, `Color/Content` and `Dimension/Radius`.

**A reference within the same group resolves transitively**, because a JS object
literal cannot reference itself. `Color/Content/On-Warning` →
`Color.Content.Primary` becomes `palette.gray.black` in TS while the CSS keeps
`var(--tapsi-color-content-primary)`. Both carry the same value, which is all
that is required — and `check.ts` verifies exactly that.

**Everything is a named export.** Project-wide rule: no default exports.

`src/index.ts` exports **types only**. Sets are imported by subpath, so adding
one never touches the barrel.

## 7. Adding or updating

Run `pnpm --filter @tapsioss/theme run check` after every change. It is the only
thing standing between a typo and a silently broken theme.

**Update existing tokens** — replace the file(s) in `figma-output-jsons/`,
re-apply §3–6 to every affected set, run `check`. Remember that `Typography` and
`Dimension` are duplicated into all four theme files: a type-scale change means
editing **all** of them.

**Add a theme** (e.g. `ride/contrast`) — drop the export in
`figma-output-jsons/ride-theme-tokens/ride-contrast.json`, create
`src/ride/contrast.{css,ts}`, and **register it in the `THEMES` map in
`scripts/check.ts`** or it will not be verified. Nothing else changes: the
`exports` map and the tsconfig `paths` are wildcarded.

**Add a product** (e.g. `eats`) — same, with a new
`figma-output-jsons/eats-theme-tokens/` directory and `src/eats/`.

**Add a primitive set** — the current model has exactly one. Supporting a second
means deciding how a consumer selects it; do not improvise this, ask first.

**Never** add a generator script. This was removed deliberately: it grew large,
and a checker that validates committed source is more trustworthy than a
generator that produces it unobserved. If you generate the files with a
throwaway script, do not commit the script.

## 8. Known gaps

- Three line heights are off the `Number` scale (§5): `Headline-Small` 30,
  `Headline-Large` 42, `Display-Medium` 60. They stay literal and will not
  follow a primitive change. Either add those steps to `Number` in Figma or snap
  the type scale to existing ones.
- **`--tapsi-stroke-*` no longer exists.** The export has no `Stroke` group;
  border widths come from `Number` (`--tapsi-number-1`, `--tapsi-number-2`).
  Figma still has a `Stroke` page, so this may be an export omission — worth
  confirming with the design team.
- Figma also has a `Shadow` page with no counterpart in the export. There are no
  shadow tokens in this package.
- `Color/Overlay/*` is identical in light and dark (both `Palette.Alpha.Dark*`).
  That may be intentional or an oversight; it is what the export says.
- `Font/Family/Mono` is `Vazirmatn`, which is not a monospace face. The
  `monospace` fallback only applies if Vazirmatn fails to load.

## 8b. Consumers still on the pre-1.0 tokens

`@tapsioss/web-components` (109 token names across 41 `.style.ts` files) and the
VitePress pages under `docs/theme/` have **not** been migrated to the two-layer
model. Rather than leave them broken, they are pinned to the last published
pre-1.0 release:

| Package            | Declares `@tapsioss/theme` as | Why                                                                              |
| ------------------ | ----------------------------- | -------------------------------------------------------------------------------- |
| `docs`             | `"0.8.0"`                     | its pages import `@tapsioss/theme/css-variables` and the default `tokens` export |
| `playground/lit`   | `"0.8.0"`                     | hosts the Lit components, which reference the pre-1.0 names                      |
| `playground/react` | `"workspace:*"`               | hosts `@tapsioss/react-ui`, which is on 1.x                                      |
| `storybook/react`  | `"workspace:*"`               | 1.x only                                                                         |
| `web-components`   | `peerDependencies: "^0.8.0"`  | documents the requirement for anyone installing it alongside 1.x                 |

**Both versions coexist under the same package name.** pnpm gives each workspace
package its own `node_modules`, so `playground/lit` and `playground/react` each
resolve `@tapsioss/theme` to what their own `package.json` asks for. There is no
aliasing and no second package name.

**The pin only holds because each playground's `tsconfig.json` sets
`"paths": {}`.** The root `tsconfig.json` aliases `@tapsioss/theme/*` to
`packages/theme/src`, which would otherwise win and silently feed 1.x tokens to
the Lit playground — producing components that look broken for no visible
reason. If you add a playground, copy that reset. If you are debugging a
playground that is somehow getting the wrong tokens, check it first.

Nothing loads both sets into one page any more, so they cannot interfere. (When
the old single playground did, it was safe: the legacy-only families were all
renamed in 1.x — `spacing` → `number`, `radius-N` → `dimension-radius-*`,
`typography-<cat>-<size>-*` → `typography-font-size-*` — and every shared name
resolved to the same value except `--tapsi-palette-gray-800`, `#323333` in 0.8.0
versus `#1f1f1f` in 1.x.)

**Do not "clean up" these pins to the workspace version.** Doing so leaves every
Lit component with no spacing and square corners. They move to 1.x when
`web-components` is migrated, not before.

## 9. Verification

```bash
pnpm --filter @tapsioss/theme run check
```

Re-derives every name and value from `figma-output-jsons/` and asserts:

1. **coverage** — every exported token is in both the CSS and the TS set, and
   neither holds anything the export does not define
2. **naming** — the CSS name is the kebab-cased Figma path; the TS path is its
   camelCase equivalent
3. **values** — literals match §4
4. **layering** — theme tokens reference primitives rather than inlining
   literals, line heights excepted
5. **agreement** — the TS value equals what the CSS `var()` chain resolves to

This is the guard that matters. A token referencing a variable nobody defines is
valid CSS — the browser just renders nothing — so it cannot be caught by reading
the file.

```bash
pnpm --filter @tapsioss/theme run build   # check runs automatically in prebuild
pnpm check:lint                           # tsc + eslint across the repo
pnpm storybook:react                      # galleries under "Theme"
```

To verify composability end to end, change the theme import in
`storybook/react/.storybook/preview.ts` and confirm the colours change while the
primitives and every metric stay put.

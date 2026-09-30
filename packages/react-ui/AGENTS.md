# AGENTS.md — `@tapsioss/react-ui`

Guidance for AI agents and humans writing components in this package.

These are review outcomes, not preferences. Each one was asked for explicitly
after a real review of the Button, which is the reference implementation — read
`src/button/` alongside this file.

---

## 1. Source of truth

**Figma is authoritative for appearance**, and the token bindings are read from
the design with `get_variable_defs`, never inferred from a screenshot or guessed
from a token's name.

**`@tapsioss/web-components` is authoritative for behaviour** — props, focus
management, ARIA, keyboard handling, edge cases — as components are ported. A
ported component's tests mirror the Lit component's test scenarios one for one.

Never invent a token. If Figma binds something the theme export does not carry,
work around it at the point of use, comment the gap with the Figma value, and
record it in the root `PARKED.md`. Do not silently substitute a similar token.

## 2. Props

**Destructure in the parameter list, with defaults there** — not in the body.

```tsx
export const Button = ({
  variant = "default",
  size = "md",
  loading = false,
  ...otherProps
}: ButtonProps) => {
```

**Spread the rest props FIRST**, before anything the component manages:

```tsx
<BaseButton
  {...otherProps}
  className={classes}
  aria-busy={loading}
  onClick={handleClick}
>
```

A consumer must not be able to replace a prop the component is responsible for.
`className` is not lost by this — destructure it and merge it into the computed
classes, so a consumer's class is added rather than dropped.

**Never `|| undefined`.** It is noise. If an attribute is valid in both states,
pass the value (`aria-disabled={disabled}` — `"false"` is valid ARIA). If it is
not, drop the attribute and express the state some other way — the Button uses
its `--loading` class rather than a `data-loading` attribute for exactly this.

**Type-check values that cross the public boundary.** A consumer can silence
TypeScript or call from plain JS, so a prop that changes what element renders
must be checked by type, not by truthiness:

```tsx
if (typeof href === "string") {
  // render an anchor
}
```

**Name handlers for what they are.** `handleClick`, not `suppressWhileLoading` —
the name describes the hook it fills, and the body explains the special case.

## 3. No type casting

**Do not use `as`.** If a cast seems necessary, the types are wrong — fix them.

The Button needed one because its `variant`/`hierarchy` union could not be
destructured. The fix was to make **both union members declare both keys**, so
destructuring narrows cleanly:

```tsx
type ButtonAppearance =
  | { variant?: "default" | "destructive"; hierarchy?: ButtonHierarchy }
  | { variant: "elevated" | "cta"; hierarchy?: "primary" };
```

If you genuinely cannot avoid a cast, **stop and confirm it** before writing it.

## 4. Rendering

**Use `render*` functions for internal elements**, not constants:

```tsx
const renderSpinner = () => { … };
const renderAdornment = (adornment: ReactNode, placement: "leading" | "trailing") => { … };
const renderBody = () => (
  <>
    {renderSpinner()}
    {renderAdornment(leadingAdornment, "leading")}
    {renderContent()}
    {renderAdornment(trailingAdornment, "trailing")}
  </>
);
```

Each returns `null` when it has nothing to render, so the caller stays flat.

**Guard optional `ReactNode` with `!= null`, never `&&`.** `0` is a valid
`ReactNode`, and `adornment && <span>{adornment}</span>` evaluates to `0`, which
React renders as a stray text node outside the wrapper. `!= null` covers both
`null` and `undefined` and keeps `0`.

## 5. Class names

**Use `clsx`.** No array-filter-join.

```tsx
const classes = clsx(
  "tapsi-button",
  `tapsi-button--${variant}-${hierarchy}`,
  { "tapsi-button--loading": loading },
  className,
);
```

Conditional classes go in an **object**, not as `condition && "class"` — one
object holds all of them and reads as a map of class to condition.

The exception is a class name read out of a CSS module, which cannot be a
computed key. See §6.

## 6. Styling

**Styles are CSS modules.** A component owns `<name>.module.css` beside it:

```tsx
import styles from "./button.module.css";
```

One ambient declaration in `src/css.d.ts` covers every stylesheet in the package
— `{ readonly [key: string]: string }`. There is no per-file generated
`.d.css.ts`: a fresh checkout would not have those until it had been built.

Class names are scoped by the build to `<local>_<hash>`, so **no class name in
this package is a public API**. A consumer cannot target `.tapsi-button`, and
must not be told to. What _is_ public:

- **`--tapsi-*` custom properties**, which CSS modules does not scope. These
  remain the supported way to influence a component's appearance.
- **`data-part` attributes** on internal elements (`data-part="spinner"`,
  `"adornment"`, `"content"`). Add one to anything that needs to be selected
  from outside the component — the tests query these, because the class names
  they used to query are now opaque.

**Conditional classes are positional in `clsx`, not an object.** This is the one
place a CSS module overrides the house style in §5: the declaration is an index
signature, so with `noUncheckedIndexedAccess` a lookup is `string | undefined`,
and `undefined` cannot be a computed key. `clsx` drops it in positional form.

```tsx
clsx(
  styles["tapsi-button"],
  loading && styles["tapsi-button--loading"],
  className,
);
```

Do **not** add `declare module "*.css"` back to `css.d.ts`. It is a shorthand
ambient declaration, which types the import as `any`, and when both patterns
exist it is the one that matches `./button.module.css` — every class-name lookup
then goes unchecked. This was caught by lint, not by the build.

**Nothing but CSS and JS ships.** `scripts/build-css.ts` scopes the stylesheet,
strips its comments, and inlines the name map into the emitted JS; no map module
is published. The scoping has to happen in our build rather than the consumer's,
because the package ships an aggregate `dist/styles.css` — if each consumer
scoped the stylesheet themselves, the aggregate would match none of them. Read
that file's header before changing the output layout; the `.module.css` → `.css`
rename in `dist` exists for a stated reason.

Because comments are stripped on the way out, the stylesheet is the right place
for long notes about what Figma binds and where the token export falls short.

Whatever the mechanism, these hold:

- **Components read tokens and nothing else.** Every value is `var(--tapsi-…)`,
  taken from what Figma binds to that property. A component never imports the
  theme — the consumer installs `@tapsioss/theme` and imports the primitives
  plus one theme.
- **Diagnostic fallbacks, not styling decisions.** `var(--token, magenta)` so a
  missing theme is obvious rather than plausible.
- **Bind a slot's geometry with the container, not the child.** An adornment is
  an arbitrary `ReactNode`, so the component cannot resize it. Size the wrapper:
  `@tapsioss/react-icons` defaults to `size="auto"` (`width/height: 100%`), so a
  Tapsi icon fills it exactly, and a `> svg { inline-size: 100% }` rule makes
  any other SVG conform. A consumer passing an explicit `size` sets an inline
  style, which wins — that is the escape hatch.
- **Colour needs no plumbing.** `BaseIcon` sets `color`/`fill: currentcolor`,
  and every wrapper inherits the button's content colour, so adornments follow
  variant and hierarchy for free. Do not pass colours down.
- **Clip, never wrap.** Every size has a fixed `block-size`, so a wrapped label
  breaks the control's height. Figma sets `overflow-clip` on the root and
  `whitespace-nowrap` on the label; mirror both.
- **Read Figma's nesting, not just its token names.** Button's
  `gap/<size>-horizontal` is _horizontal padding on the label frame_, not a flex
  `gap`; implementing it as `gap` silently collapsed to nothing on a button with
  no adornments. When a token's name implies a CSS property, confirm against the
  design's structure.

## 7. Tests

Playwright, against the React playground's `/test` route. A test describes its
tree as **data**, because React elements cannot cross `page.evaluate`:

```tsx
await renderReact(page, {
  type: "Button",
  props: { "data-testid": "b", leadingAdornment: icon("lead") },
  children: "کلیک کنید",
});
```

`type` resolves against the `@tapsioss/react-ui` barrel first, then falls back
to a DOM tag, so raw `<svg>` can be nested. Each call mounts a **fresh** tree —
a keyed wrapper forces a real remount, without which mount-only behaviour like
`autoFocus` silently does not re-fire.

Two things that will waste your time otherwise:

- **A React `onClick` cannot block activation.** It runs on a delegated
  synthetic event, after any native listener on the element has already fired.
  Block pointer activation in CSS (`pointer-events: none`) and handle the
  keyboard path in the handler.
- **Assert against real interaction.** A test that proves something only via an
  artificially attached native listener is usually proving nothing.

## 8. Verification

```bash
pnpm --filter @tapsioss/react-ui run build
pnpm --filter @tapsioss/react-ui run test
pnpm check:lint
```

A component is not done until it has been looked at in the browser. Type-checks
and passing tests did not catch the Button's padding being half what Figma
specifies — comparing computed styles against the design's token bindings did.

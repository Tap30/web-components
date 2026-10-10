# Parked

Known, deliberately deferred work. Each item says what it is, why it was parked,
and what it would take — so it can be picked up without re-deriving the context.

Last reviewed: 2026-10-10.

---

## Release tooling

### Archived Lit packages

`@tapsioss/web-components`, `@tapsioss/react-components` and
`@tapsioss/web-icons` are `private` and changesets-ignored, and run only in
`.github/workflows/archived.yml`. One follow-up is outward-facing and was left
to a human: `npm deprecate` the published versions, pointing at
`@tapsioss/react-ui` / `@tapsioss/react-icons`.

The docs site (VitePress, `docs/`) documents the archived track but is still
deployed to Pages by `gh-pages.yml`, alongside Storybook at `/storybook/`.

### wireit setup

Parked alongside changesets. Not revisited.

---

## Tokens and theme

### The `docs` site documents the legacy tokens

The VitePress pages under `docs/theme/` describe the legacy `--tapsi-*` set.
They import `@tapsioss/theme/legacy/tokens.css` and print values from a private
copy, `docs/utils/legacyTokens.ts` (the theme package ships the legacy set as
CSS only). Nothing documents the current `--tds-*` tokens outside Storybook.

**To resolve:** rewrite `docs/theme/*.md` against the two-layer model (the
Storybook galleries under `storybook/react/src/theme/` are a working reference),
then delete `legacyTokens.ts`.

### The legacy token set is still shipped

`@tapsioss/theme` carries `legacy/tokens.css` — the 0.8.0 stylesheet, frozen —
because `@tapsioss/web-components` still reads the `--tapsi-*` names (109 of
them, across 41 `.style.ts` files) and apps are migrating to
`@tapsioss/react-ui` component by component. The current tokens are `--tds-*`,
so the two never overlap (`packages/theme/AGENTS.md` §8b).

**To resolve:** when the Lit components are retired, delete `src/legacy/`, its
check in `scripts/check.ts`, and the imports in `playground/lit` and `docs`, in
a major release of the theme (and so of react-ui).

### Figma export gaps

The Button (Rasti DS, node 135:2594) binds three things the token export does
not carry. Each is worked around in
`packages/react-ui/src/button/button.module.css` with a comment at the point of
use:

- **`Surface-Gradient/Brand`** — the `cta` variant is a gradient in Figma. The
  export has no gradient tokens, so it falls back to the flat
  `Color/Component/Button/Surface/CTA` the export does define.
- **The `Fab` drop shadow** — the `elevated` variant. No Shadow group, so the
  value (`0 4px 16px rgba(0,0,0,0.1)`) is inlined.
- **`Ride/Color/State/Overlay-Pressed`** (`#0000001a`) — the pressed overlay.
  That collection does not exist in the export; the nearest equivalent,
  `Color/Overlay/Pressed`, is 20% black rather than 10%, and it is
  `Color/Overlay/Hovered` that is 10%. The code follows the export. **The design
  team should reconcile these** — either the button page is on an older token
  set, or the overlay tokens are mismatched.

`Typography/Letter-Spacing/Label` is also absent from the export, but its value
is `0` at every size, so nothing is lost by omitting it.

- **No `Stroke` group.** Figma still has a Stroke page, but the custom-plugin
  export contains no stroke tokens. Border widths currently come from `Number`.
  Possibly an export omission — confirm with whoever maintains the plugin.
- **No `Shadow` group**, same situation.
- **Three off-scale line heights.** `Headline-Small` 30, `Headline-Large` 42 and
  `Display-Medium` 60 are not on the `Number` scale, so they ship as literals in
  the theme layer and will not follow a primitive change. Adding those steps to
  `Number` in Figma would fix it.
- **`Color/Overlay/*` is identical in light and dark** (both use
  `Palette.Alpha.Dark*`). May be intentional; it is what the export says.

### `packages/theme` has no `dev` script

Nothing watches the token sources, so a token change needs
`pnpm --filter @tapsioss/theme run build` before either playground sees it.
Storybook reads the theme from source and is unaffected.

---

## Styles for `@tapsioss/react-ui`

How styles reach a consumer is **decided**: the published JS imports no CSS, and
consumers import one minified stylesheet, `@tapsioss/react-ui/styles.css` — the
model Mantine uses (see `packages/react-ui/AGENTS.md` §6 and the header of
`scripts/build-css.ts`). That closed the old "isomorphism" item: importing the
package in plain Node works.

Considered and not chosen: Emotion (a runtime, and a provider for SSR),
vanilla-extract / StyleX (still emit a stylesheet someone must load, plus a
bundler plugin everywhere), and injecting the CSS from JS at runtime as the Lit
components do (no import for the consumer, but no styles in server-rendered
HTML).

What is still open:

- **Per-component stylesheets** (Mantine's `styles/Button.css`), for apps that
  use a few components and want less CSS. Today there is only the aggregate: 9.2
  kB minified / 1.9 kB gzipped with two components. Revisit when it grows.
- **Not yet tried in a real consumer app.** Verified in this repo only — the
  test suite runs against a build that imports `styles.css` as a consumer does,
  and a plain-Node import. Installing the tarballs in a web app (Next.js in
  particular) is the outstanding check.
- **The theme tarball is versioned `0.8.0`** until changesets bumps it to 1.0.0,
  the same number as the pre-1.0 theme on npm. It is nevertheless safe to
  install into an app that still renders the Lit components: add the
  `@tapsioss/theme/legacy/tokens.css` import, which replaces the app's old
  `@tapsioss/theme/css-variables` one.

### `clsx` object form for CSS-module classes

Preferred style is `{ [styles["tapsi-row--ellipsis"]]: condition }`, but it does
not compile: with `noUncheckedIndexedAccess`, a CSS-module lookup is
`string | undefined`, and TypeScript rejects that as a computed key (TS2464).
The components therefore use the positional form, `condition && styles["…"]`
(`AGENTS.md` §6).

**To resolve**, pick one: a small checked helper that returns `string` and
throws on a class missing from the stylesheet (no cast, and a typo fails
loudly); a non-null assertion on each lookup (an assertion, which `AGENTS.md` §3
treats like a cast); or leave the positional form as the house style.

## Missing component tokens for the Button

Figma hardcodes the adornment box as `size-[24px]` / `20px` on the icon frames —
there is no `Dimension/Component/Button/Icon/*` token to bind to, the way there
is for size, padding, gap and radius.

The implementation uses the primitive scale (`--tds-number-24`,
`--tds-number-20`), which carries those exact steps, rather than a literal. It
works and stays token-driven, but it reaches across a layer: components are
otherwise meant to consume the theme layer only. A proper
`Dimension/Component/Button/Icon/{Small,Medium,Large}` in Figma would remove the
exception.

Two values were not read from Figma, because the connection dropped, and are
worth confirming:

- Small's `20` adornment size was taken from the review.
- `min-w-[96px]` was read on the Large button only. Medium and Small have no
  minimum width in the code rather than a guessed one.

## Missing component tokens for the Row

The Row (Rasti DS, node 33094:18205) binds `Dimension/Component/Row/*` for its
size, padding and gap, but Figma hardcodes the rest — so, like the Button's
icons, these use the primitive scale in
`packages/react-ui/src/row/row.module.css`:

- **Icon box** `size-[24px]` → `--tds-number-24`.
- **Trailing gap** `gap-[4px]` (between the chevron and the icon) →
  `--tds-number-4`.
- **Leading badge** `12px` ring, `6px` dot and `-2px` offset →
  `--tds-number-12`, `-6`, `-2`. A `Dimension/Component/Badge/*` set would cover
  this and the future Badge component.
- **Row background** is a literal white in Figma, not a variable. The code uses
  `Color/Surface/Primary` so dark themes work; worth binding in Figma.

Figma's `trailingNavigate` chevron is not built in (react-ui must not depend on
`@tapsioss/react-icons`); consumers pass it in the `trailing` slot.

**No interactive states in Figma.** A Row with `href` or `onClick` renders as a
link or a button, but the design defines no hover, pressed or focus appearance
for it. The code draws no hover or pressed state, and borrows the Button's focus
ring (`Number/2` in `Color/Content/Accent`) so keyboard focus is visible. The
design team should specify all three.

## Unit-level test suite

`@tapsioss/react-ui` already has a **100% coverage gate**: its Playwright run
collects V8 coverage and fails below 100% (`playwright/coverage.ts`).

What was asked for and is not started is a second, unit-level suite on `vitest`,
with the same threshold, enforced on commit. Open questions: does it sit
alongside Playwright or replace part of it, and is "on commit" a pre-commit hook
or CI?

## Testing

### Archived tests still depend on the network

`@tapsioss/react-ui`'s link-button test serves its target with `context.route`
(a blank page on the reserved `.test` TLD). The archived Lit suite still goes
online, which makes it slow or flaky without a network:

- `button/standard/button.test.ts` and `button/icon-button/icon-button.test.ts`
  open `https://google.com` and wait for it to load — same fix as react-ui.
- `avatar`, `banner`, `chat-bubble`, `discount-card` and `modal` tests load
  images from `https://picsum.photos` — route them to a local fixture image.

---

## Reading Figma from an agent

Only the **Figma desktop app's** connection can read the Rasti DS file, and only
while the app is open with the file loaded. The remote Figma connection answers
"no edit access to this file", and the Figma plugin's connection is refused from
this location. When the desktop app is closed, an agent cannot read the design
at all — the Button's unconfirmed values above are from such a drop.

**To resolve:** give the account behind the remote connection edit access to the
file, so reading the design does not depend on the desktop app.

---

## Docs hygiene

- `storybook:react` is the only root script outside the `dev:` prefix. Kept
  because it was explicitly requested under that name.
- `packages/theme/CONTRIBUTION.md` is named differently from the repo-root
  `CONTRIBUTING.md`. Also as requested.

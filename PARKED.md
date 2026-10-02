# Parked

Known, deliberately deferred work. Each item says what it is, why it was parked,
and what it would take — so it can be picked up without re-deriving the context.

Last reviewed: 2026-10-02.

---

## Release tooling

### Leaving alpha

`@tapsioss/theme` and `@tapsioss/react-ui` are in changesets **pre mode**
(`.changeset/pre.json`, tag `alpha`), so `changeset publish` puts every release
on the `alpha` dist-tag. Going stable is `pnpm exec changeset pre exit`, then
the normal version PR; the next publish lands on `latest`.

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

### `.tsbuildinfo` ships inside every package

Root `tsconfig.json` sets `"incremental": true`, and each package's
`tsconfig.build.json` sets `"outDir": "./dist"` without `tsBuildInfoFile`. When
`incremental` is on and `outDir` is set, TypeScript writes the cache to
`<outDir>/<config>.tsbuildinfo` — so it lands in `dist`, and `files: ["./dist"]`
is a directory allowlist, so it ships.

Invisible locally because `.gitignore` has `dist`; only visible in a tarball.
Pre-existing and already in published releases (the `@tapsioss/theme@0.8.0`
tarball on npm contains a 40K copy).

| Package          | Size  |
| ---------------- | ----- |
| web-icons        | 242K  |
| web-components   | 113K  |
| react-icons      | 110K  |
| react-components | 80K   |
| react-ui         | 42K   |
| theme            | 41.8K |
| icons            | 40K   |

Contents are relative paths only — no build-machine paths leak.

**To resolve:** either `"incremental": false` in the root `tsconfig.build.json`
(one line, fixes all seven, costs cross-run `tsc` caching that wireit largely
duplicates), or add `"!dist/*.tsbuildinfo"` to `files` in each `package.json`
(keeps incremental, seven edits, must be remembered for each new package).

---

## Tokens and theme

### The `docs` package

`docs` pins `@tapsioss/theme` to `0.8.0` so its VitePress pages keep working.
Those pages read the pre-1.0 shape — `tokens.spacing`, `tokens.stroke`, and a
**default** export from `@tapsioss/theme/tokens`, none of which exist in 1.x.
`docs/utils/flattenTokens.ts` was given a local structural type so the repo
still type-checks.

**To resolve:** rewrite `docs/theme/*.md` against the two-layer model (the
Storybook galleries under `storybook/react/src/theme/` are a working reference),
then move `docs` onto `workspace:*`.

### `@tapsioss/web-components` is still on pre-1.0 tokens

109 token names across 41 `.style.ts` files. They are CSS-in-TS strings, so
nothing fails to compile — the components simply render unstyled against 1.x.
This is why `playground/lit` pins `0.8.0`.

**To resolve:** mechanical rename to the 1.x names. `--tapsi-stroke-1/2` map to
`--tapsi-number-1/2`; see `packages/theme/AGENTS.md` for the rest.

### Figma export gaps

The Button (Rasti DS, node 135:2594) binds three things the token export does
not carry. Each is worked around in `packages/react-ui/src/button/button.css`
with a comment at the point of use:

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

## Isomorphism for `@tapsioss/react-ui`

**Still open. No longer blocks styling work** — components use CSS modules,
which is decided and implemented. What remains open is the part CSS modules does
not address.

Review asked for CSS-in-JS so components are isomorphic. The problem is real and
still confirmed after the CSS modules change: importing the package in plain
Node fails today.

```
ERR_UNKNOWN_FILE_EXTENSION
Unknown file extension ".css" for .../react-ui/dist/button/button.css
```

That comes from the `import "./button.css"` the build leaves in
`dist/button/button.js`, which exists so a consumer never has to remember a
stylesheet — it is what `sideEffects` in `package.json` protects.

CSS modules neither fixed nor worsened this. The class names are inlined into
the JS at build time rather than imported, so the only thing standing between
the package and plain Node is still that one stylesheet import. Only the last
row of the table below actually fixes it.

Nothing CSS-in-JS is installed. The options, with what each actually costs:

| Option                      | Fixes the Node failure | Cost                                                                                                                                                                  |
| --------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@emotion/css`              | yes                    | ~8kB runtime; composes with `clsx` directly; no babel plugin or provider; SSR needs `@emotion/server` extraction to avoid unstyled flash                              |
| `@emotion/react` + `styled` | yes                    | better SSR story via `CacheProvider`, but the `css` prop needs a babel/swc plugin or jsx pragma, and pushes a provider onto consumers                                 |
| vanilla-extract / StyleX    | **no**                 | zero runtime, but still emits a `.css` file, so a stylesheet import remains; needs a bundler plugin wired into both playgrounds and Storybook                         |
| Drop the side-effect import | yes                    | no new dependency and no runtime — consumers import `@tapsioss/react-ui/styles.css` once (that export already exists). Loses the "just use the component" ergonomics. |

All of them keep `var(--tapsi-*)` working, so the token architecture is
unaffected whichever is chosen. The first two would also replace CSS modules
rather than sit alongside it, so they are now a bigger change than they were.

**Until this is decided**, new components follow the Button's CSS modules
pattern — see `packages/react-ui/AGENTS.md` §6. Styling work is no longer
blocked on it.

## Missing component tokens for the Button

Figma hardcodes the adornment box as `size-[24px]` / `20px` on the icon frames —
there is no `Dimension/Component/Button/Icon/*` token to bind to, the way there
is for size, padding, gap and radius.

The implementation uses the primitive scale (`--tapsi-number-24`,
`--tapsi-number-20`), which carries those exact steps, rather than a literal. It
works and stays token-driven, but it reaches across a layer: components are
otherwise meant to consume the theme layer only. A proper
`Dimension/Component/Button/Icon/{Small,Medium,Large}` in Figma would remove the
exception.

Small's `20` was taken from the review rather than read from Figma — the
`get_design_context` call for the Small variant timed out. Worth confirming.

## Test coverage gate

Add `vitest` with a **100% coverage threshold**, enforced on commit.

Not started. All tests today are Playwright against a real browser; vitest would
be a second, unit-level suite. Open questions: does it sit alongside Playwright
or replace part of it, and is "on commit" a pre-commit hook or CI?

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

## Docs hygiene

- `storybook:react` is the only root script outside the `dev:` prefix. Kept
  because it was explicitly requested under that name.
- `packages/theme/CONTRIBUTION.md` is named differently from the repo-root
  `CONTRIBUTING.md`. Also as requested.

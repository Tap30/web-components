# Parked

Known, deliberately deferred work. Each item says what it is, why it was parked,
and what it would take — so it can be picked up without re-deriving the context.

Last reviewed: 2026-09-29.

---

## Release tooling

### changesets setup

Parked during the `@tapsioss/theme` 1.0 overhaul. No changeset has been created
for any of that work yet.

`pnpm changesets:status` also now reports three advisory lines:

```
Package "@tapsioss/docs"           must depend on the current version of "@tapsioss/theme": "1.0.0" vs "0.8.0"
Package "@tapsioss/web-components" must depend on the current version of "@tapsioss/theme": "1.0.0" vs "^0.8.0"
Package "@tapsioss/lit-playground" must depend on the current version of "@tapsioss/theme": "1.0.0" vs "0.8.0"
```

These are correct: those three deliberately pin the **published** `0.8.0` rather
than the workspace 1.x, because they hold the Lit generation of the system.
Changesets objects to any workspace package depending on a non-current version
of another workspace package. Whether this blocks `changeset version` was not
determined — the only conclusive test mutates every package version.

**To resolve:** decide whether to silence it (drop the `web-components` peer
range, alias the other two) or accept it. Tied to the docs decision below.

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

## Testing

### `@tapsioss/react-ui` has no tests

`packages/react-ui/playwright.config.ts` exists and points at `playground/react`
on port 3001, and `playground/react/src/test-setup.tsx` serves that URL — but
both are **scaffolding**.

The Lit suite injects raw HTML into `<body>` because web components register
themselves globally; React components cannot work that way. A render bridge is
needed (most likely a `window.__render(element)` helper driven through
`page.evaluate`). That shape should be decided alongside the first real test
rather than guessed in advance.

---

## Docs hygiene

- `docs/package-connections.md` still describes the single `playground` package
  and the pre-1.0 theme wiring. Stale since the playground split.
- `storybook:react` is the only root script outside the `dev:` prefix. Kept
  because it was explicitly requested under that name.
- `packages/theme/CONTRIBUTION.md` is named differently from the repo-root
  `CONTRIBUTING.md`. Also as requested.
